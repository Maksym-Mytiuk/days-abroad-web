import { useOutletContext } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { data } from './data';

import { IUser } from '@/common/interfaces/user';
import { getDifferenceInDays } from '@/common/utils/date';

import './world.scss';

export default function World() {
  const [user] = useOutletContext() as [user: IUser];

  const visitedCountriesDays = user.travelHistory.reduce((acc, country) => {
    const days = getDifferenceInDays(country.from, country.to || new Date().toString());
    acc[country.countryCode] = acc[country.countryCode] ? acc[country.countryCode] + days : days;
    return acc;
  }, {} as Record<string, number>);

  const maxDaysInSingleCountry = Math.max(...Object.values(visitedCountriesDays));

  function getOpacity(countryCode: string) {
    if (!visitedCountriesDays[countryCode]) {
      return false;
    }

    const minOpacity = 0.5;
    const maxSafeOpacity = visitedCountriesDays[countryCode] / maxDaysInSingleCountry / 2;
    const finalOpacity = +(maxSafeOpacity + minOpacity).toFixed(2);
    return `rgba(203, 114, 170, ${finalOpacity})`;
  }

  return (
    <>
      <svg className="world-map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1010 666">
        {data.map(({ countryCode, country, path }) => (
          <path
            key={countryCode}
            className={`${countryCode} ${countryCode === user.countryCode ? 'home' : ''}`}
            style={{ fill: `${getOpacity(countryCode)}` }}
            d={path}
            data-tooltip-id="world-tooltip"
            data-tooltip-float={true}
            data-tooltip-content={country}
          />
        ))}
        <text x="585" y="250" className="text">
          russia is a terrorist state
        </text>
      </svg>
      <Tooltip id="world-tooltip" />
    </>
  );
}
