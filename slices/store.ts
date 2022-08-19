import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./counterSlice";
import sidebar from "./sidebarSlice";
import filter from "./filterSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
    reducer: {counterReducer, sidebar, filter, modalSlice},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

