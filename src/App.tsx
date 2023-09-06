import React, { useEffect, Suspense } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

import { IUser } from './interfaces/user';

import useUser, { IAction, USER_ACTION } from './hooks/useUser';

import Navigation from './components/Navigation';
import Loader from './components/Loader';

export default function App() {
  return (
    <div id="app" className="container">
      <Navigation />
      <Content />
    </div>
  );
}

function Content() {
  const userData = useLoaderData() as IUser;
  const [user, dispatch] = useUser() as [user: IUser, dispatch: React.Dispatch<IAction>];

  useEffect(() => {
    dispatch({ type: USER_ACTION.SET_USER, payload: userData });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Outlet context={[user, dispatch]} />
    </Suspense>
  );
}
