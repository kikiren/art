import { configureStore } from '@reduxjs/toolkit';
import newTripReducer from './NewTripSlice';

export const store = configureStore({
  reducer: {
    newTrip: newTripReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
