import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    userinfo:userSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})