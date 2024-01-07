import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from '@/features/user/store/userSlice';
import { travelHistorySlice } from '@/features/TravelHistory/store/travelHistorySlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    travelHistory: travelHistorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
