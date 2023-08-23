import { useReducer } from 'react';
import { IUser } from '../interfaces/user';

export const USER_ACTION = {
  SET_USER: 'SET_USER',
  ADD_TRIP: 'ADD_TRIP',
} as const;

export interface IAction {
  type: keyof typeof USER_ACTION;
  payload: any;
}

export default function useUser() {
  return useReducer(reducer, null);
}

function reducer(user: IUser, action: IAction) {
  switch (action.type) {
    case USER_ACTION.SET_USER:
      return action.payload;
    case USER_ACTION.ADD_TRIP:
      return action.payload;
    default:
      throw Error('Unknown action: ' + action.type);
  }
}
