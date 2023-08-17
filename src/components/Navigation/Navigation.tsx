import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router';

import firebase from '../../services/Firebase';

import './navigation.scss';

const NAVIGATION_MENU = [
  { to: ROUTES.HOME, title: 'Home' },
  { to: ROUTES.USER_ACCOUNT, title: 'User Account' },
];

export default function Navigation() {
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
    <nav className="navigation">
      <ul className="navigation-list">
        {NAVIGATION_MENU.map((item) => (
          <li key={item.title}>
            <NavLink to={item.to}>{item.title}</NavLink>
          </li>
        ))}
        <li>
          <a href="#" onClick={signOut}>
            Sign Out
          </a>
        </li>
      </ul>
    </nav>
  );
}
