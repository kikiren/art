import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StopListState<T = any> {
  list: T[];
}

const initialState: StopListState = {
  list: [],
};

export const stopListSlice = createSlice({
  name: 'stopList',
  initialState,
  reducers: {
    addStop: (state, action: PayloadAction<any>) => {
      state.list.push(action.payload);
    },
    removeStop: (
      state,
      action: PayloadAction<(stop_id: string) => boolean>
    ) => {
      state.list = state.list.filter(stop => stop.id !== action.payload);
    },
    clearList: state => {
      state.list = [];
    },
  },
});

export const { addStop, removeStop, clearList } = stopListSlice.actions;

export default stopListSlice.reducer;
