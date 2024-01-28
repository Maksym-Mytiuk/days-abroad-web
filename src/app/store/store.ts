import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from '@/features/User/store/userSlice';
import { tripsSlice } from '@/features/Trips/store/tripsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    trips: tripsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
