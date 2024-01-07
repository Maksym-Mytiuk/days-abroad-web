import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

import { IUser } from '@/common/interfaces/user';

export type User = Omit<IUser, 'travelHistory'>;
type UserState = {
  user: User;
};
const initialState: UserState = {
  // TODO use default user const
  user: { email: '', name: '', secondName: '', countryCode: '', born: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<{ key: keyof User; value: string }>) => {
      const { key, value } = action.payload;
      state.user[key] = value;
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
