import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import {productsApi} from "./services/products";


export const store = configureStore({
    reducer: combineReducers({
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>