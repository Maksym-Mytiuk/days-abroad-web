import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAppSelector } from '@/app/store';

import { IAction } from '@/common/hooks/useUser';
import { IUser } from '@/common/interfaces/user';
import User from '@/common/utils/user';
import { countries } from '@/common/utils/countries';

import homeAwayImage from '@/common/assets/images/home-away.png';
import atHomeImage from '@/common/assets/images/at-home.png';
import './home-page.scss';
import { selectUser } from '../user/store/userSelectors';

function App() {
  const [user] = useOutletContext() as [user: IUser, dispatch: React.Dispatch<IAction>];
  const user2 = useAppSelector(selectUser);
  console.error(user2);

  const [traveler, setTraveler] = useState({} as User);
  const { daysFromLastTrip, daysFromLastTravel, isAtHome } = traveler;

  const [currentCountry, setCurrentCountry] = useState('');

  useEffect(() => {
    const traveler = new User(user);
    setTraveler(traveler);

    if (!traveler.isAtHome) {
      const country = countries.find((item) => item.key === traveler.currentLocation.countryCode)?.value || '';
      setCurrentCountry(country);
    }
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
          <h1>You have not been home for {daysFromLastTravel} days</h1>
          {daysFromLastTrip !== daysFromLastTravel && (
            <h2>
              Currently you are in {currentCountry} for {daysFromLastTrip} days
            </h2>
          )}
        </>
      )}
    </div>
  );
}

export default App;
