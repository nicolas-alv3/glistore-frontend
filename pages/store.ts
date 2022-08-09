import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../slices/counterSlice";
import sidebar from "../slices/sidebarSlice";
import filter from "../slices/filterSlice";

export const store = configureStore({
    reducer: {counterReducer, sidebar, filter},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch