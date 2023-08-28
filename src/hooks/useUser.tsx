import { useReducer } from 'react';
import { DEFAULT_USER, getTrip, IUser } from '../interfaces/user';

export const USER_ACTION = {
  SET_USER: 'SET_USER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_TRIPS: 'UPDATE_TRIPS',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
} as const;

export interface IAction {
  type: keyof typeof USER_ACTION;
  payload?: any;
}

export default function useUser() {
  return useReducer(reducer, DEFAULT_USER);
}

function reducer(user: IUser, action: IAction) {
  switch (action.type) {
    case USER_ACTION.SET_USER:
      return action.payload;
    case USER_ACTION.UPDATE_USER:
      return { ...user, ...action.payload };
    case USER_ACTION.UPDATE_TRIPS:
      return { ...user, travelHistory: [...action.payload] };
    case USER_ACTION.ADD_TRIP:
      return { ...user, travelHistory: [...user.travelHistory, getTrip()] };
    case USER_ACTION.DELETE_TRIP:
      return { ...user, travelHistory: [...action.payload] };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}
