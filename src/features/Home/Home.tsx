import { useMemo } from 'react';

import { useAppSelector } from '@/app/store';
import { selectUser } from '@/features/user/store/userSelectors';
import { selectTrips } from '@/features/Trips/store/tripsSelectors';

import User from '@/common/utils/user';
import { countries } from '@/common/utils/countries';

import homeAwayImage from '@/common/assets/images/home-away.svg';
import atHomeImage from '@/common/assets/images/at-home.svg';
import './home.scss';

export default function Home() {
  const user = useAppSelector(selectUser);
  const trips = useAppSelector(selectTrips);

  // Derived rather than stored: User is a pure projection of user + trips.
  const traveler = useMemo(() => (user.countryCode ? new User({ ...user, travelHistory: trips }) : null), [user, trips]);

  if (!traveler) {
    return null;
  }

  const { daysFromLastTrip, daysFromLastTravel, isAtHome } = traveler;
  const currentCountry = isAtHome
    ? ''
    : countries.find((item) => item.key === traveler.currentLocation.countryCode)?.value || '';

  return (
    <div>
      {isAtHome ? (
        <>
          <img className="home-illustration" src={atHomeImage} alt="" width={400} height={300} />
          <h1>You haven't traveled for {daysFromLastTrip} days</h1>
        </>
      ) : (
        <>
          <img className="home-illustration" src={homeAwayImage} alt="" width={400} height={300} />
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
