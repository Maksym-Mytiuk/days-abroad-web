import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import userDB from '@/common/services/db/User';

import { ITrip, getTrip } from '@/common/interfaces/user';

const initialState = {
  travelHistory: [] as ITrip[],
};

export const travelHistorySlice = createSlice({
  name: 'travelHistory',
  initialState,
  reducers: {
    setTravelHistory(state, action: PayloadAction<ITrip[]>) {
      state.travelHistory = action.payload;
    },
    addTrip(state) {
      state.travelHistory.push(getTrip());
    },
    deleteTrip(state, action: PayloadAction<string>) {
      state.travelHistory = state.travelHistory.filter((trip) => trip.id !== action.payload);
      userDB.save({ travelHistory: state.travelHistory });
    },
    updatedTrips(state, action: PayloadAction<{ id: string; key: keyof ITrip; value: string | boolean }>) {
      const { id, key, value } = action.payload;
      const trip = state.travelHistory.find((item) => item.id === id) as any;
      if (trip) {
        trip[key] = value;
      }
    },
    saveTrips(state) {
      state.travelHistory = state.travelHistory.sort(
        (current, next) => Date.parse(current.from) - Date.parse(next.from)
      );
      userDB.save({ travelHistory: state.travelHistory });
    },
  },
});

export const { setTravelHistory, addTrip, updatedTrips, deleteTrip, saveTrips } = travelHistorySlice.actions;
