import { configureStore } from '@reduxjs/toolkit'
import columnReducer from './features/columns/columnSlice'
import elementClickedReducer from './features/elementClicked/elementClickedSlice'
export const store = configureStore({
  reducer: {
    column: columnReducer,
    elementClicked: elementClickedReducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store