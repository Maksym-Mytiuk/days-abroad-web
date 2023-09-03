import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router';

import userDB from '../../services/db/User';

import './navigation.scss';

const NAVIGATION_MENU = [
  { to: ROUTES.HOME, title: 'Home' },
  { to: ROUTES.USER_ACCOUNT, title: 'Account' },
  { to: ROUTES.TRAVEL_HISTORY, title: 'My trips' },
];

export default function Navigation() {
  const navigate = useNavigate();

  async function signOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      await userDB.signout();
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      console.error(error);
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
            Log Out
          </a>
        </li>
      </ul>
    </nav>
  );
}
