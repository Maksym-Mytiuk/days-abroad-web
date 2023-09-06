import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IAction } from '../../hooks/useUser';

import { IUser } from '../../interfaces/user';
import User from '../../utils/user';

import homeAwayImage from '../../assets/images/home-away.png';
import atHomeImage from '../../assets/images/at-home.png';
import './home-page.scss';

function App() {
  const [user] = useOutletContext() as [user: IUser, dispatch: React.Dispatch<IAction>];

  const [daysFromLastTrip, setdaysFromLastTrip] = useState(0);
  const [isAtHome, setIsAtHome] = useState(false);

  useEffect(() => {
    const traveler = new User(user);
    setIsAtHome(traveler.isAtHome);
    setdaysFromLastTrip(traveler.daysFromLastTrip);
  }, [user]);

  return (
    <div>
      {isAtHome ? (
        <>
          <img width={512} height={512} src={atHomeImage} alt="at home" />
          <h1>You haven't traveled for {daysFromLastTrip} days</h1>
        </>
      ) : (
        <>
          <img width={512} height={512} src={homeAwayImage} alt="home away" />
          <h1>You have not been home for {daysFromLastTrip} days</h1>
        </>
      )}
    </div>
  );
}

export default App;
