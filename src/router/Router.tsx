import { createBrowserRouter, redirect } from 'react-router-dom';

import firebase from '../services/Firebase';

import App from '../App';
import HomePage from '../pages/HomePage';
import SignIn from '../pages/SignIn';

export const ROUTES = {
  HOME: '/',
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
    children: [{ element: <HomePage />, path: '' }],
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
