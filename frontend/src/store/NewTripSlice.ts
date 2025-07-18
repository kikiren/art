import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '@/mockData.json';

export interface NewTripState<T = any> {
  stops: T[];
  geometry: any;
}

const initialState: NewTripState = {
  stops: mockData.stops,
  geometry: mockData.geometry,
};

// const initialState: NewTripState = {
//   stops: [],
//   geometry: null,
// };

export const NewTripSlice = createSlice({
  name: 'newTrip',
  initialState,
  reducers: {
    addStop: (state, action: PayloadAction<any>) => {
      state.stops = [...state.stops, action.payload]
    },
    removeStop: (
      state,
      action: PayloadAction<(stop_id: string) => boolean>
    ) => {
      state.stops = state.stops.filter(stop => stop.id !== action.payload);
    },
    reorderStops: (state, action: PayloadAction<any>) => {
      state.stops = action.payload;
    },
    updateGeometry: (state, action: PayloadAction<any>) => {
      state.geometry = action.payload;
    },
    clearList: state => {
      state.stops = [];
      state.geometry = null;
    },
  },
});

export const { addStop, removeStop, reorderStops, updateGeometry, clearList } = NewTripSlice.actions;

export default NewTripSlice.reducer;
