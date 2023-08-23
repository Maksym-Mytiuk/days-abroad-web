import React, { useEffect, Suspense, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

import { IUser } from './interfaces/user';

import useUser, { IAction, USER_ACTION } from './hooks/useUser';

import Navigation from './components/Navigation';
import Loader from './components/Loader';

function App() {
  const [user, dispatch] = useUser() as [user: IUser, dispatch: React.Dispatch<IAction>];

  const userData = useLoaderData();

  useEffect(() => {
    dispatch({ type: USER_ACTION.SET_USER, payload: userData });
  }, []);

  return (
    <main className="container">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Outlet context={[user, dispatch]} />
      </Suspense>
    </main>
  );
}

export default App;
