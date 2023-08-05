import { useEffect, useState } from 'react';

import { getFullTravelHistory, getDifferenceInDays } from '../../utils/date';
import { data, ITravelHistory } from '../../../data';

import './home-page.scss';
import homeAwayImage from '../../assets/images/home-away.png';
import atHomeImage from '../../assets/images/at-home.png';

function App() {
  const [daysFromLastTravel, setDaysFromLastTravel] = useState(0);
  const [isAtHome, setIsAtHome] = useState(false);

  useEffect(() => {
    const { user } = data;
    const fullTravelHistory = getFullTravelHistory(data);
    const currentLocation = fullTravelHistory.at(-1) as ITravelHistory;
    const isUserAtHome = currentLocation.countryCode === user.countryCode;
    setIsAtHome(isUserAtHome);

    if (isUserAtHome) {
      const differenceInDays = getDifferenceInDays(currentLocation.from);
      setDaysFromLastTravel(differenceInDays);
    } else {
      const lastTimeAtHome = fullTravelHistory.findLast((item) => item.countryCode === user.countryCode);
      if (lastTimeAtHome?.to) {
        const differenceInDays = getDifferenceInDays(lastTimeAtHome.to);
        setDaysFromLastTravel(differenceInDays);
      }
    }
  }, []);

  return (
    <div className="container">
      {isAtHome ? (
        <>
          <img src={atHomeImage} alt="at home" />
          <h1>You haven't traveled for {daysFromLastTravel} days</h1>
        </>
      ) : (
        <>
          <img src={homeAwayImage} alt="home away" />
          <h1>You have not been home for {daysFromLastTravel} days</h1>
        </>
      )}
    </div>
  );
}

export default App;
