import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITrip } from '@/common/interfaces/user';

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
  },
});

export const { setTravelHistory } = travelHistorySlice.actions;
