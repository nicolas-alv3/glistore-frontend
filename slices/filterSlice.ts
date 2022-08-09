import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {SearchRequest, SortType} from "../src/types";


export interface FilterState {
    req: SearchRequest,
    lastVisitedId: string
}

const initialState: FilterState = {
    req: {
        name: "",
        pageSize:10,
        page:1,
        filter: {
            talles: [],
            categories: []
        },
        sort: {
            price: SortType.NONE
        }
    },
    lastVisitedId: ""
}

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setName: (state, name: PayloadAction<string>) => {
            state.req.name = name.payload;
        },
        setTalles: (state, talles: PayloadAction<string[]>) => {
            state.req.talles = talles.payload;
        },
        setPartialReq: (state, sReq: PayloadAction<Partial<SearchRequest>>) => {
            state.req = JSON.parse(JSON.stringify(Object.assign(state.req, sReq.payload)))
        },
        setFullState: (state, sReq: PayloadAction<Partial<FilterState>>) => {
            Object.keys(sReq).forEach( k => {
                state[k] = { ...state[k], ...sReq.payload[k]}
            })
        },
        resetFilter: (state) => {
            state.req = initialState.req;
            state.lastVisitedId = "";
        }
    },
})

// Action creators are generated for each case reducer function
export const {setPartialReq, resetFilter, setName, setTalles} = filterSlice.actions

//Selectors
export const selectFilterState = (state: RootState) => state.filter;


export default filterSlice.reducer