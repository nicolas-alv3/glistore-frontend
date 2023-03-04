import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";

export interface CounterState {
    username: string,
    user_email: string
}

const initialState: CounterState = {
    username: '',
    user_email: ''
}

export const storeSlice = createSlice({
    name: 'storeSlice',
    initialState,
    reducers: {
        setStore: (state, action: PayloadAction<{ username: string, user_email: string }>) => {
            const {username, user_email} = action.payload;
            state.username = username;
            state.user_email = user_email;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            const username = action.payload.split("/")[1].toLowerCase();
            state.username = username;
            window.sessionStorage.setItem('glistore_username', username);
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.user_email = action.payload;
            window.sessionStorage.setItem('glistore_user_email', action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const {setStore, setUsername, setUserEmail} = storeSlice.actions

//Selectors
export const selectStore = (state: RootState) => state.storeSlice;

export default storeSlice.reducer
