import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

// Define the initial state using that type
const initialState: {id: string, type: string} = {
  id: '',
  type: '',
}


export const elementClickedSlice = createSlice({
  name: 'elementClicked',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addElementClicked: (state, action: PayloadAction<{id: string, type: string}>) => {
      return {
        id: action.payload.id,
        type: action.payload.type,
      }
    },
    removeElementClicked: (state, action: PayloadAction<string>) => {
      return {
        id: '',
        type: '',
      }
    },
  }
})

export const { addElementClicked, removeElementClicked } = elementClickedSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTempElements = (state: RootState) => state.column

export default elementClickedSlice.reducer