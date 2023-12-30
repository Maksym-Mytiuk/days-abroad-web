import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

import { IUser } from '@/common/interfaces/user';

type User = Omit<IUser, 'travelHistory'>;
type UserState = {
  user: User;
};

const initialState: UserState = {
  user: { email: '', name: '', secondName: '', countryCode: '', born: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
