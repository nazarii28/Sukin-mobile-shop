import { Product } from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface FavoriteState {
    products: Product[]
}

const initialState: FavoriteState = {
    products: []
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavoriteProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeFavoriteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        }
    }
})

export const {addFavoriteProduct, removeFavoriteProduct} = favoriteSlice.actions;

export default favoriteSlice.reducer;