import { useEffect, useState } from 'react';

import { getFullTravelHistory, getDifferenceInDays } from '../../utils/date';
import { data } from '../../../data';
import { ITravelHistory } from '../../interfaces/user';

import './home-page.scss';
import homeAwayImage from '../../assets/images/home-away.png';
import atHomeImage from '../../assets/images/at-home.png';

function App() {
  const [daysFromLastTravel, setDaysFromLastTravel] = useState(0);
  const [isAtHome, setIsAtHome] = useState(false);

  useEffect(() => {
    const { countryCode } = data;
    const fullTravelHistory = getFullTravelHistory(data);
    const currentLocation = fullTravelHistory.at(-1) as ITravelHistory;
    const isUserAtHome = currentLocation.countryCode === countryCode;
    setIsAtHome(isUserAtHome);

    if (isUserAtHome) {
      const differenceInDays = getDifferenceInDays(currentLocation.from);
      setDaysFromLastTravel(differenceInDays);
    } else {
      const lastTimeAtHome = fullTravelHistory.findLast((item) => item.countryCode === countryCode);
      if (lastTimeAtHome?.to) {
        const differenceInDays = getDifferenceInDays(lastTimeAtHome.to);
        setDaysFromLastTravel(differenceInDays);
      }
    }
  }, []);

  return (
    <div>
      {isAtHome ? (
        <>
          <img src={atHomeImage} alt="at home" />
          <h1>You haven't traveled for {daysFromLastTravel} days</h1>
        </>
      ) : (
        <>
          <img width={512} height={512} src={homeAwayImage} alt="home away" />
          <h1>You have not been home for {daysFromLastTravel} days</h1>
        </>
      )}
    </div>
  );
}

export default App;
