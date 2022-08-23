import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import favoriteReducer from "./features/favorite/favoriteSlice";
import {productsApi} from "./services/products";

const rootReducer = combineReducers({
    cart: cartReducer,
    favorite: favoriteReducer,
    [productsApi.reducerPath]: productsApi.reducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>