import { PayloadAction, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import userDB from '@/common/services/db/User';

import { ITrip, getTrip } from '@/common/interfaces/user';

export const tripsAdapter = createEntityAdapter<ITrip>();

const initialState = tripsAdapter.getInitialState();

export const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips(state, action: PayloadAction<ITrip[]>) {
      tripsAdapter.setAll(state, action.payload);
    },
    addTrip(state) {
      tripsAdapter.addOne(state, getTrip());
    },
    saveTrips(_, action: PayloadAction<ITrip[]>) {
      userDB.save({ travelHistory: action.payload });
    },
    updateTrip: tripsAdapter.updateOne,
    deleteTrip: tripsAdapter.removeOne,
  },
});

export const { setTrips, addTrip, updateTrip, deleteTrip, saveTrips } = tripsSlice.actions;
