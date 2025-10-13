import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shopSlice.js"

export const store = configureStore({
    reducer: {
        shopReducer
    },
})