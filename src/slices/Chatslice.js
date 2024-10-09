import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const Chatslice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatiinginfo: (state, action) => {
      // state.value += 1
      state.value = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { chatiinginfo } = Chatslice.actions

export default Chatslice.reducer