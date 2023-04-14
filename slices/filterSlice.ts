import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {SearchRequest, SortType} from "../src/types";


export interface FilterState {
    req: SearchRequest,
    lastVisitedId: string
}

export const initialState: FilterState = {
    req: {
        name: "",
        pageSize: 10,
        page: 0,
        filter: {
            categories: []
        },
        sort: {
            price: SortType.NONE,
            date: SortType.NEWEST
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
        setId: (state, id) => {
            state.lastVisitedId = id.payload
        },
        setPartialReq: (state, sReq: PayloadAction<Partial<SearchRequest>>) => {
            state.req = JSON.parse(JSON.stringify(Object.assign(state.req, sReq.payload)))
        },
        resetFilter: (state) => {
            state.req = initialState.req;
            state.lastVisitedId = "";
        },
        removeCategory: (state, category: PayloadAction<string>) => {
            state.req.filter.categories = state.req.filter.categories.filter(c => c !== category.payload);
        },

        cleanFilter: (state) => {
            state.req.filter.categories = [];
        },
        setPagination: (state, params) => {
            state.req.page = params.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {resetFilter, setPagination, setId} = filterSlice.actions

export default filterSlice.reducer
