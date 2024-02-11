import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import user from '@/common/services/db/User';
await user.init();

const App = React.lazy(() => import('@/app/App'));
const Home = React.lazy(() => import('@/features/home'));
const Account = React.lazy(() => import('@/features/account'));
const Trips = React.lazy(() => import('@/features/trips'));
const Statistic = React.lazy(() => import('@/features/statistic'));
const SignIn = React.lazy(() => import('@/features/SignIn'));
const NotFound = React.lazy(() => import('@/features/notFound'));

export const ROUTES = {
  HOME: '/',
  USER_ACCOUNT: '/account-settings',
  TRAVEL_HISTORY: '/history',
  STATISTIC: '/statistic',
  SIGN_IN: '/signin',
} as const;

export const router = createBrowserRouter([
  {
    element: <App />,
    path: ROUTES.HOME,
    loader: async () => {
      const isUserAuth = user.isUserAuth;
      if (!isUserAuth) {
        return redirect(ROUTES.SIGN_IN);
      }

      try {
        return await user.getUser();
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
        element: <Trips />,
        path: ROUTES.TRAVEL_HISTORY,
      },
      {
        element: <Statistic />,
        path: ROUTES.STATISTIC,
      },
    ],
  },
  {
    element: <SignIn />,
    path: ROUTES.SIGN_IN,
    loader: () => {
      const isUserAuth = user.isUserAuth;
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
