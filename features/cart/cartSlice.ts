import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Product } from "../../types";


export interface ICartItem {
    quantity: number
    product: Product
}

export interface CartState {
    cartItems: ICartItem[],
    totalQuantity: number
}

const initialState: CartState = {
    cartItems: [],
    totalQuantity: 0
}

const calculateTotalQuantity = (state: CartState) => state.cartItems.reduce((acc, cur) => cur.quantity + acc ,0)



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeItem: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item.product.id !== action.payload);
            state.totalQuantity = calculateTotalQuantity(state);
        },
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const foundItem = state.cartItems.find(item => item.product.id === action.payload.product.id);
            if(foundItem) {
                foundItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
            state.totalQuantity = calculateTotalQuantity(state);
        },
        plusItem: (state, action: PayloadAction<Product>) => {
            const foundItem = state.cartItems.find(item => item.product.id === action.payload.id);
            if(foundItem) {
                foundItem.quantity++;
            } else {
                state.cartItems.push({
                    quantity: 1,
                    product: action.payload
                })
            }
            state.totalQuantity = calculateTotalQuantity(state);
        },
        minusItem: (state, action: PayloadAction<Product>) => {
            const foundItem = state.cartItems.find(item => item.product.id === action.payload.id);

            if(foundItem) {
                if(foundItem.quantity - 1 === 0) {
                    state.cartItems = state.cartItems.filter(item => item.product.id !== foundItem.product.id)
                } else {
                    foundItem.quantity--
                }
                state.totalQuantity = calculateTotalQuantity(state);
            }
        }
    }
})

export const { plusItem, minusItem, addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer