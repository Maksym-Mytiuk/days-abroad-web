import { useEffect, Suspense } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

import { useAppDispatch } from '@/app/store';

import { setUser } from '@/features/User/store/userSlice';
import { setTrips } from '@/features/Trips/store/tripsSlice';

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
  const dispatch = useAppDispatch();
  const userData = useLoaderData() as IUser;

  useEffect(() => {
    const { email, name, secondName, countryCode, born, travelHistory } = userData;
    dispatch(setUser({ email, name, secondName, countryCode, born }));
    dispatch(setTrips(travelHistory));
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
}
