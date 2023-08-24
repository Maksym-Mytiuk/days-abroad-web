import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import firebase from '../services/Firebase';
import { DEFAULT_USER } from '../interfaces/user';

const App = React.lazy(() => import('../App'));
const Home = React.lazy(() => import('../pages/Home'));
const Account = React.lazy(() => import('../pages/Account'));
const TravelHistory = React.lazy(() => import('../pages/TravelHistory'));
const SignIn = React.lazy(() => import('../pages/SignIn'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

export const ROUTES = {
  HOME: '/',
  USER_ACCOUNT: '/account-settings',
  TRAVEL_HISTORY: '/history',
  SIGN_IN: '/signin',
} as const;

await firebase.init();

// TODO RECHECK NEW USER FLOW
export const router = createBrowserRouter([
  {
    element: <App />,
    path: ROUTES.HOME,
    loader: async () => {
      const isUserAuth = firebase.isUserAuth;
      if (!isUserAuth) {
        return redirect(ROUTES.SIGN_IN);
      }

      try {
        const user = await firebase.getUserInfo();
        if (user) {
          return user;
        } else {
          redirect(ROUTES.USER_ACCOUNT);
          return DEFAULT_USER;
        }
      } catch (error) {
        console.error(error);
        return redirect(ROUTES.SIGN_IN);
      }
    },
    children: [
      {
        element: <Home />,
        path: '',
      },
      {
        element: <Account />,
        path: ROUTES.USER_ACCOUNT,
      },
      {
        element: <TravelHistory />,
        path: ROUTES.TRAVEL_HISTORY,
      },
    ],
  },
  {
    element: <SignIn />,
    path: ROUTES.SIGN_IN,
    loader: () => {
      const isUserAuth = firebase.isUserAuth;
      if (isUserAuth) {
        return redirect(ROUTES.HOME);
      }

      return null;
    },
  },
  {
    element: <NotFound />,
    path: '*',
  },
]);
