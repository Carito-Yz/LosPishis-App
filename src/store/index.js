import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shopSlice.js"
import cartReducer from "./slices/cartSlice.js"
import { shopApi } from "./services/shopApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/AuthApi.js";
import userReducer from "./slices/userSlice.js"

export const PishisStore = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        userReducer,
        [shopApi.reducerPath]: shopApi.reducer, 
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware)=>(getDefaultMiddleware()
    .concat(shopApi.middleware)
    .concat(authApi.middleware))
})

setupListeners(PishisStore.dispatch)