import { configureStore } from '@reduxjs/toolkit';
import stopListReducer from './stopListSlice';

export const store = configureStore({
  reducer: {
    stopList: stopListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
