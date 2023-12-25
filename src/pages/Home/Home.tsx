import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IAction } from '../../hooks/useUser';

import { IUser } from '../../interfaces/user';
import User from '../../utils/user';
import { countries } from '../../utils/countries';

import homeAwayImage from '../../assets/images/home-away.png';
import atHomeImage from '../../assets/images/at-home.png';
import './home-page.scss';

function App() {
  const [user] = useOutletContext() as [user: IUser, dispatch: React.Dispatch<IAction>];

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
