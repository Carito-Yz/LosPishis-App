import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shopSlice.js"
import cartReducer from "./slices/cartSlice.js"
import { shopApi } from "./services/shopApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";

export const PishisStore = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        [shopApi.reducerPath]: shopApi.reducer
    },
    middleware: (getDefaultMiddleware)=>(getDefaultMiddleware().concat(shopApi.middleware))
})

setupListeners(PishisStore.dispatch)