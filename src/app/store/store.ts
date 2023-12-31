import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from '@/features/user';
import { travelHistorySlice } from '@/features/TravelHistory';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    travelHistory: travelHistorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
