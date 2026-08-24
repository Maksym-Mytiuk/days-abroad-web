import { PayloadAction, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import userDB from '@/common/services/db/User';

import { ITrip, getTrip } from '@/common/interfaces/user';

// Newly added trips have an empty `from` and sort last until a date is picked.
export const tripsAdapter = createEntityAdapter<ITrip>({
  sortComparer: (a, b) => {
    if (!a.from) return 1;
    if (!b.from) return -1;
    return a.from.localeCompare(b.from);
  },
});

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
    updateTripById: tripsAdapter.updateOne,
    deleteTripById(state, action: PayloadAction<ITrip['id']>) {
      tripsAdapter.removeOne(state, action.payload);
    },
  },
});

export const { setTrips, addTrip, updateTripById, deleteTripById, saveTrips } = tripsSlice.actions;
