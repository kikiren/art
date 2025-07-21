import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UserState {
    user: any;
    trips: any[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    trips: [],
    loading: false,
    error: null,
};


export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setTrips: (state, action: PayloadAction<any[]>) => {
            state.trips = action.payload;
        },
        addTrip: (state, action: PayloadAction<any>) => {
            state.trips.push(action.payload);
        },
        removeTrip: (state, action: PayloadAction<any>) => {
            state.trips = state.trips.filter(trip => trip.id !== action.payload.id);
        },
        updateTrip: (state, action: PayloadAction<any>) => {
            const index = state.trips.findIndex(trip => trip.id === action.payload.id);
            if (index !== -1) {
                state.trips[index] = action.payload;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, setTrips, setLoading, setError, addTrip, removeTrip, updateTrip } = UserSlice.actions;

export default UserSlice.reducer;