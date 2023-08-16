import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import firebase from './services/Firebase';
import { ROUTES } from './router';
import { IUser } from './interfaces/user';

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

  async function signOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      await firebase.signout();
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <a className="sign-out" href="#" onClick={signOut}>
        SIGN OUT
      </a>
      <Outlet />
    </>
  );
}

export default App;
