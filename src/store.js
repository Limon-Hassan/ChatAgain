import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import { Chatslice } from './slices/Chatslice'

export const store = configureStore({
  reducer: {
    userinfo: userSlice,
    chatuserinfo:Chatslice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})