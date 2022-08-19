import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";

export interface ModalState {
    visible: boolean,
    id: string,
}

const initialState: ModalState = {
    visible: false,
    id:""
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        showModal: (state, id) => {
            state.visible = true;
            state.id = id.payload;
        },
        hideModal: (state) => {
            state.visible = false;
        },
        toggleModal: (state) => {
            state.visible = !state.visible;
        },
        setVisible: (state, modal) => {
            state.visible = modal.payload.open;
            state.id = modal.payload.id;
        }
    },
})

// Action creators are generated for each case reducer function
export const {showModal, hideModal, toggleModal, setVisible} = modalSlice.actions

//Selectors
export const selectModal = (state: RootState) => state.modalSlice as ModalState;


export default modalSlice.reducer
