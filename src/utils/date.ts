import { IUser, ITrip } from '../interfaces/user';

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function getFullTravelHistory(user: IUser): ITrip[] {
  const { travelHistory } = user;
  if (!travelHistory.length) {
    const atHome = createTrip({ countryCode: user.countryCode, from: user.born, to: null });
    return [atHome];
  }

  const fullHistory = [];
  const firstTravel = travelHistory[0];
  if (firstTravel.countryCode !== user.countryCode) {
    const trip = createTrip({ countryCode: user.countryCode, from: user.born, to: firstTravel.from });
    fullHistory.push(trip);
  }

  travelHistory.forEach((currentTravel, index) => {
    fullHistory.push(currentTravel);
    const timeAtHomeBeetwenTrips = handleGapsInTravel(currentTravel, travelHistory[index + 1], user.countryCode);
    timeAtHomeBeetwenTrips && fullHistory.push(timeAtHomeBeetwenTrips);
  });

  const lastTravel = travelHistory[travelHistory.length - 1];
  if (lastTravel.to && lastTravel.countryCode !== user.countryCode) {
    const trip = createTrip({ countryCode: user.countryCode, from: lastTravel.to, to: null });
    fullHistory.push(trip);
  }

  return fullHistory;
}

export function getDifferenceInDays(startDate: string, endDate = new Date().toString()) {
  const differenceInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.floor(differenceInTime / DAY);
}

function handleGapsInTravel(currentTravel: ITrip, nextTravel: ITrip, countryCode: string): ITrip | undefined {
  if (currentTravel.to && nextTravel && getDifferenceInDays(currentTravel.to, nextTravel.from) > 1) {
    return createTrip({ countryCode, from: currentTravel.to, to: nextTravel.from });
  }
}

function createTrip({ countryCode, from, to }: Omit<ITrip, 'id'>): ITrip {
  return { countryCode, from, to, id: crypto.randomUUID() };
}
