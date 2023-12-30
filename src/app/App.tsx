import React, { useEffect, Suspense } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

import { useAppDispatch } from '@/app/store';

import { setUser } from '@/features/user/store/userSlice';

import useUser, { IAction, USER_ACTION } from '@/common/hooks/useUser';
import { IUser } from '@/common/interfaces/user';
import Navigation from '@/common/components/Navigation';
import Loader from '@/common/components/Loader';

export default function App() {
  return (
    <div className="container">
      <Navigation />
      <Content />
    </div>
  );
}

function Content() {
  const userData = useLoaderData() as IUser;
  const [user, dispatch] = useUser() as [user: IUser, dispatch: React.Dispatch<IAction>];

  const sDispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: USER_ACTION.SET_USER, payload: userData });

    const { email, name, secondName, countryCode, born } = userData;
    sDispatch(setUser({ email, name, secondName, countryCode, born }));
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Outlet context={[user, dispatch]} />
    </Suspense>
  );
}
