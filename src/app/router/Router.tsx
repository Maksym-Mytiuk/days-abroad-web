import React from 'react';
import { createBrowserRouter, redirect } from 'react-router';

import user from '@/common/services/db/User';
import Loader from '@/common/components/Loader';

const App = React.lazy(() => import('@/app/App'));
const Home = React.lazy(() => import('@/features/Home'));
const Account = React.lazy(() => import('@/features/Account'));
const Trips = React.lazy(() => import('@/features/Trips'));
const Statistic = React.lazy(() => import('@/features/Statistic'));
const SignIn = React.lazy(() => import('@/features/sign-in'));
const NotFound = React.lazy(() => import('@/features/not-found'));

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
    hydrateFallbackElement: <Loader />,
    path: ROUTES.HOME,
    loader: async () => {
      await user.init();

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
    hydrateFallbackElement: <Loader />,
    path: ROUTES.SIGN_IN,
    loader: async () => {
      await user.init();

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
