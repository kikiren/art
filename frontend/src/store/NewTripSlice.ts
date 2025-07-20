import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '@/mockData.json';

export interface NewTripState<T = any> {
  title: string;
  description: string;
  tempStop: T | null;
  stops: T[];
  geometry: any;
  stopOrderChanged: boolean;
}

const initialState: NewTripState = {
  title: 'Map Title',
  description: 'Some description',
  tempStop: null,
  stops: [],
  geometry: null,
  stopOrderChanged: false,
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
    addTempStop: (state, action: PayloadAction<any>) => {
      state.tempStop = action.payload;
    },
    clearTempStop: (state) => {
      state.tempStop = null;
    },
    addStop: (state, action: PayloadAction<any>) => {
      state.stops = [...state.stops, action.payload]
      state.tempStop = null;
    },
    removeStop: (
      state,
      action: PayloadAction<number>
    ) => {
      state.stops = state.stops.filter((_, idx) => idx !== action.payload);
    },
    reorderStops: (state, action: PayloadAction<any>) => {
      state.stops = action.payload;
      state.stopOrderChanged = true;
    },
    resetStopOrderChanged: (state) => {
      state.stopOrderChanged = false;
    },
    updateStopNamePosition: (state, action: PayloadAction<{ id: string; namePosition: [number, number] }>) => {
      const { id, namePosition } = action.payload;
      const stopIndex = state.stops.findIndex(stop => stop.id === id);
      if (stopIndex !== -1) {
        state.stops[stopIndex].namePosition = namePosition;
      }
    },
    updateGeometry: (state, action: PayloadAction<any>) => {
      state.geometry = action.payload;
    },
    clearList: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { addStop, removeStop, reorderStops, updateStopNamePosition, updateGeometry, clearList, updateTitle, updateDescription, addTempStop, clearTempStop, resetStopOrderChanged } = NewTripSlice.actions;

export default NewTripSlice.reducer;
