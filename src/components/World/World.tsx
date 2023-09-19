import { data } from './data';
import { Tooltip } from 'react-tooltip';

import './world.scss';

export default function World() {
  return (
    <>
      <svg className="world-map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1010 666">
        {data.map(({ countryCode, country, path }) => (
          <path
            key={countryCode}
            id={countryCode}
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
