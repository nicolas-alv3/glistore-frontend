import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";

export interface NavMenuState {
    show: boolean,
}

const initialState: NavMenuState = {
    show: false,
}

export const navMenuSlice = createSlice({
    name: 'navMenuSlice',
    initialState,
    reducers: {
        show: (state) => {
            state.show = true;
        },
        hideNavMenu: (state) => {
            state.show = false;
        },
        toggleNavMenu: (state) => {
            state.show = !state.show;
        },
    },
})

// Action creators are generated for each case reducer function
export const {hideNavMenu, toggleNavMenu} = navMenuSlice.actions

//Selectors
export const selectShow = (state: RootState) => state.navMenuSlice.show;


export default navMenuSlice.reducer