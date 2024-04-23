import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active: false
}

const { reducer, actions } = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleActive(state) {
      state.active = !state.active
    }
  }
})

export const { toggleActive } = actions

export default reducer
