import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null,
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginuserid: (state, action) => {
      // state.value += 1
      state.value=action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { loginuserid } = usersSlice.actions

export default usersSlice.reducer