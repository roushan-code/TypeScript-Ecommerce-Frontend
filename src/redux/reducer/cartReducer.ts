import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { CartReducerInitialState } from "../../types/reducer-type"
import { CartItems, ShippingInfo } from "../../types/types"

const initialState: CartReducerInitialState = {
    loading: true,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        country: "",
        state: "",
        pinCode: "",
    }

}

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action:PayloadAction<CartItems>) => {
            state.loading = true;
            const index = state.cartItems.findIndex(item => item.productId === action.payload.productId);
            if(index !== -1) {
                state.cartItems[index] = action.payload
            } else{
                state.cartItems.push(action.payload)
            }
            state.loading = false;
            },
        removeFromCart: (state, action:PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(item => item.productId !== action.payload)
            state.loading = false;
            },
        calculatePrice: (state) => {
            state.subtotal = state.cartItems.reduce((acc, item) => acc + item.price *
            item.quantity, 0)
            state.tax = Math.round(state.subtotal * 0.18)
            state.shippingCharges = state.subtotal > 1000 ? 0 : 40
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount
            state.discount = state.discount 
        },
        discountApplied: (state, action:PayloadAction<number>) => {
            state.discount = action.payload;
            },
        saveShippingInfo: (state, action:PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
            },
        resetCart: () => initialState,
    }
})

export const { addToCart, removeFromCart, calculatePrice, discountApplied, saveShippingInfo, resetCart } = cartReducer.actions;