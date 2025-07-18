import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '@/mockData.json';

export interface NewTripState<T = any> {
  stops: T[];
  route: any;
}

const initialState: NewTripState = {
  stops: mockData.stops,
  route: mockData.route,
};

// const initialState: NewTripState = {
//   stops: [],
//   route: null,
// };

export const NewTripSlice = createSlice({
  name: 'newTrip',
  initialState,
  reducers: {
    addStop: (state, action: PayloadAction<any>) => {
      state.stops.push(action.payload);
    },
    removeStop: (
      state,
      action: PayloadAction<(stop_id: string) => boolean>
    ) => {
      state.stops = state.stops.filter(stop => stop.id !== action.payload);
    },
    clearList: state => {
      state.stops = [];
    },
  },
});

export const { addStop, removeStop, clearList } = NewTripSlice.actions;

export default NewTripSlice.reducer;
