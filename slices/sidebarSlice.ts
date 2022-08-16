import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {CartItem} from "../src/types";

export interface SidebarState {
    show: boolean,
    cart: CartItem[]
}

const initialState: SidebarState = {
    show: false,
    cart: [],
}

export const sidebarSlice = createSlice({
    name: 'sidebarSlice',
    initialState,
    reducers: {
        show: (state) => {
            state.show = true;
        },
        hide: (state) => {
            state.show = false;
        },
        toggle: (state) => {
            state.show = !state.show;
        },
        setCart: (state, cart: PayloadAction<CartItem[]>) => {
            state.cart = cart.payload;
        },
        addItem: (state, item: PayloadAction<CartItem>) => {
            state.cart = state.cart.concat([item.payload])
        },
        removeFromIndex: (state, idx: PayloadAction<number>) => {
            state.cart = state.cart.filter( (i, index) => index !== idx.payload)
        },
        resetCart: (state) => {
            state.cart = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const {show, hide, toggle, addItem, removeFromIndex, resetCart, setCart} = sidebarSlice.actions

//Selectors
export const selectShow = (state: RootState) => state.sidebar.show;
export const selectCart = (state: RootState) => state.sidebar.cart;


export default sidebarSlice.reducer