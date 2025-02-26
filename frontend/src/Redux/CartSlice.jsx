import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  totalQuantity: 0,
};

// Async thunk to save cart data in the backend
export const saveCartAsync = createAsyncThunk(
  "cart/saveCart",
  async (cart, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("User not authenticated");
      }
      console.log("Sending cart data to backend:", cart); // Debugging
      
      const response = await axios.post(
        "http://localhost:5000/cart",
        cart,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Backend response:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error("Error saving cart:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // Payload contains the product object
      console.log("Reducer received payload:", newItem);

      // Find if the item already exists in the cart
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          productId: newItem._id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image1,
          quantity: 1,
        });
      }
      // Update the total quantity of items in the cart
      state.totalQuantity++;
      console.log("Updated cart state:", state);
    },

    incrementQuantity: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalQuantity--;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== _id);
        state.totalQuantity--;
      }
    },

    removeItemCompletely: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        // Deduct the item's total quantity from the totalQuantity count
        state.totalQuantity -= existingItem.quantity;
        // Remove the item from the cart
        state.items = state.items.filter((item) => item._id !== _id);
      }
    },


    extraReducers: (builder) => {
      builder
        .addCase(saveCartAsync.fulfilled, (state, action) => {
          console.log("Cart saved in DB successfully", action.payload);
        })
        .addCase(saveCartAsync.rejected, (state, action) => {
          console.error("Failed to save cart in DB", action.payload);
        });
    },
  },
});
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItemCompletely,
} = cartSlice.actions;
export default cartSlice.reducer;
