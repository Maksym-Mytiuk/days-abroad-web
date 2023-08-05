import { Outlet, useNavigate } from 'react-router-dom';

import firebase from './services/Firebase';
import { ROUTES } from './router';

function App() {
  const navigate = useNavigate();

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
