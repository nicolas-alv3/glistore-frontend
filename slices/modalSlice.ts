import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";

export interface ModalState {
    visible: boolean
}

const initialState: ModalState = {
    visible: false,
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        showModal: (state) => {
            state.visible = true;
        },
        hideModal: (state) => {
            state.visible = false;
        },
        toggleModal: (state) => {
            state.visible = !state.visible;
        },
        setVisible: (state, visible) => {
            state.visible = visible.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {showModal, hideModal, toggleModal, setVisible} = modalSlice.actions

//Selectors
export const selectShow = (state: RootState) => state.modalSlice.visible;


export default modalSlice.reducer