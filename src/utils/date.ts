// TODO REFACTOR!!!

import { IUser, ITrip } from '../interfaces/user';

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function getDifferenceInDays(startDate: string, endDate = new Date().toString()) {
  const start = +new Date(startDate);
  const end = +new Date(endDate);
  const differenceInTime = new Date(end).getTime() - new Date(start).getTime();

  return Math.floor(differenceInTime / DAY);
}

export function getFullTravelHistory({ travelHistory, born, countryCode }: IUser): ITrip[] {
  const fullHistory = [];

  if (!travelHistory.length) {
    // TODO change all random to uuid
    fullHistory.push({ countryCode, from: born, to: null, id: Math.random().toString() });
    return fullHistory;
  }

  const firstTravel = travelHistory[0];
  if (firstTravel.countryCode !== countryCode) {
    fullHistory.push({ countryCode, from: born, to: firstTravel.from, id: Math.random().toString() });
  }

  travelHistory.forEach((currentTravel, index) => {
    fullHistory.push(currentTravel);

    const nextTravel = travelHistory[index + 1];
    if (currentTravel.to && nextTravel && getDifferenceInDays(currentTravel.to, nextTravel.from) > 1) {
      fullHistory.push({ countryCode, from: currentTravel.to, to: nextTravel.from, id: Math.random().toString() });
    }
  });

  const lastTravel = travelHistory[travelHistory.length - 1];
  if (lastTravel.to && lastTravel.countryCode !== countryCode) {
    fullHistory.push({ countryCode, from: lastTravel.to, to: null, id: Math.random().toString() });
  }

  return fullHistory;
}
