import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IAction } from '../../hooks/useUser';

import { getFullTravelHistory, getDifferenceInDays } from '../../utils/date';
import { ITrip, IUser } from '../../interfaces/user';

import homeAwayImage from '../../assets/images/home-away.png';
import atHomeImage from '../../assets/images/at-home.png';
import './home-page.scss';

function App() {
  const [user] = useOutletContext() as [user: IUser, dispatch: React.Dispatch<IAction>];

  // TODO MOVE ALL LOGIC TO UTILS
  const [daysFromLastTravel, setDaysFromLastTravel] = useState(0);
  const [isAtHome, setIsAtHome] = useState(false);

  useEffect(() => {
    const { countryCode } = user;
    const fullTravelHistory = getFullTravelHistory(user);

    const currentLocation = fullTravelHistory.at(-1) as ITrip;
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
