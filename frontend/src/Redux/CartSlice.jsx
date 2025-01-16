import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // Payload contains the product object
      console.log("Reducer received payload:", newItem);

      // Find if the item already exists in the cart
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity = 1
        state.items.push({ ...newItem, quantity: 1 });
      }

      // Update the total quantity of items in the cart
      state.totalQuantity++;
      console.log("Updated cart state:", state);
    },

    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalQuantity--;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity--;
      }
    },

    removeItemCompletely: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        // Deduct the item's total quantity from the totalQuantity count
        state.totalQuantity -= existingItem.quantity;
        // Remove the item from the cart
        state.items = state.items.filter((item) => item.id !== id);
      }
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
