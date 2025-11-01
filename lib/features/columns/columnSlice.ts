import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { ColumnElement } from '@/lib/type'

export type ColumnElementWithoutIcon = Omit<ColumnElement, 'icon'>
// Define the initial state using that type
const initialState: ColumnElementWithoutIcon[] = []


export const columnSlice = createSlice({
  name: 'column',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<ColumnElement>) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        type: action.payload.type,
        content: action.payload.content,
      })
    },
   
    updateColumn: (state, action: PayloadAction<ColumnElement>) => {
      return state.map(column => column.id === action.payload.id ? {
        id: action.payload.id,
        name: action.payload.name,
        type: action.payload.type,
        content: action.payload.content,
        children: action.payload.children,
      } : column)
    },
    deleteElement: (state, action: PayloadAction<{idElement: string, columnId: string}>) => {
      return state.map(column => column.id === action.payload.columnId ? {
        id: column.id,
        name: column.name,
        type: column.type,
        content: column.content,
        children: column.children?.filter(element => element.id !== action.payload.idElement),
      } : column)
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      return state.filter(column => column.id !== action.payload)
    }
  }
})

export const { addColumn, updateColumn, deleteElement, deleteColumn } = columnSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectColumns = (state: RootState) => state.column

export default columnSlice.reducer