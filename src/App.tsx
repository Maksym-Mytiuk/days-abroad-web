import { useEffect, useState, Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import firebase from './services/Firebase';
import { ROUTES } from './router';
import { IUser } from './interfaces/user';

import Navigation from './components/Navigation';
import Loader from './components/Loader';

function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({} as IUser);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const userInfo = await firebase.getUserInfo();
        if (userInfo) {
          setUserInfo(userInfo);
        } else {
          navigate(ROUTES.USER_ACCOUNT);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getUserInfo();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <main className="container">
        <Navigation />
        <Outlet />
      </main>
    </Suspense>
  );
}

export default App;
