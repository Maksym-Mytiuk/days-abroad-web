import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import firebase from '../services/Firebase';

const App = React.lazy(() => import('../App'));
const Home = React.lazy(() => import('../pages/Home'));
const Account = React.lazy(() => import('../pages/Account'));
const SignIn = React.lazy(() => import('../pages/SignIn'));

export const ROUTES = {
  HOME: '/',
  USER_ACCOUNT: '/account-settings',
  SIGN_IN: '/signin',
} as const;

await firebase.init();
export const router = createBrowserRouter([
  {
    element: <App />,
    path: ROUTES.HOME,
    loader: () => {
      const isUserAuth = firebase.isUserAuth;
      if (!isUserAuth) {
        return redirect(ROUTES.SIGN_IN);
      }

      return null;
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
]);
