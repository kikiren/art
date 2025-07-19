import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '@/mockData.json';

export interface NewTripState<T = any> {
  title: string;
  description: string;
  stops: T[];
  geometry: any;
}

const initialState: NewTripState = {
  title: 'Map Title',
  description: 'Some description',
  stops: [],
  geometry: null,
};

export const NewTripSlice = createSlice({
  name: 'newTrip',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
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
      Object.assign(state, initialState);
    },
  },
});

export const { addStop, removeStop, reorderStops, updateGeometry, clearList, updateTitle, updateDescription } = NewTripSlice.actions;

export default NewTripSlice.reducer;
