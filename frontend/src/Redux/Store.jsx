// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer, // Add your reducers here
    },
});

export default store;
