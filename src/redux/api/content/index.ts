import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    updateContent(state, action) {
      console.log({payload: action.payload})
      state.data = action.payload
    }
  }
})

export const { updateContent } = contentSlice.actions

export default contentSlice.reducer
