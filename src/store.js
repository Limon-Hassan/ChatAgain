import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import Chatslice from './slices/Chatslice';

const rootReducer = combineReducers({
  userinfo: userSlice,
  chatuserinfo: Chatslice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});