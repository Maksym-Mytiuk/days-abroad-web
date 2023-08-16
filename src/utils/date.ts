import { IUser, ITravelHistory } from '../interfaces/user';

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function getDifferenceInDays(startDate: number, endDate = +new Date()) {
  const differenceInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.floor(differenceInTime / DAY);
}

export function getFullTravelHistory({ travelHistory, born, country, countryCode }: IUser): ITravelHistory[] {
  const fullHistory = [];

  if (!travelHistory.length) {
    fullHistory.push({ countryCode, country, from: born, to: null });
    return fullHistory;
  }

  const firstTravel = travelHistory[0];
  if (firstTravel.countryCode !== countryCode) {
    fullHistory.push({ countryCode, country, from: born, to: firstTravel.from });
  }

  travelHistory.forEach((currentTravel, index) => {
    fullHistory.push(currentTravel);

    const nextTravel = travelHistory[index + 1];
    if (currentTravel.to && nextTravel && getDifferenceInDays(currentTravel.to, nextTravel.from) > 1) {
      fullHistory.push({ countryCode, country, from: currentTravel.to, to: nextTravel.from });
    }
  });

  const lastTravel = travelHistory[travelHistory.length - 1];
  if (lastTravel.to && lastTravel.countryCode !== countryCode) {
    fullHistory.push({ countryCode, country, from: lastTravel.to, to: null });
  }

  return fullHistory;
}
