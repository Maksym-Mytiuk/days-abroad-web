import { getDifferenceInDays } from './date';
import { ITrip, IUser } from '../interfaces/user';

export default class User {
  private _user: IUser;
  private _trips: ITrip[];

  constructor(user: IUser) {
    this._user = user;
    this._trips = this.constructFullTravelHistory(user.travelHistory);
  }

  get user() {
    return this._user;
  }

  get trips() {
    return this._trips;
  }

  get currentLocation() {
    return this.trips[this.trips.length - 1];
  }

  get isAtHome() {
    return this.currentLocation.countryCode === this.user.countryCode;
  }

  get daysFromLastTravel() {
    const lastTimeAtHome = this.trips.findLast((item) => item.countryCode === this.user.countryCode);
    return lastTimeAtHome?.to ? getDifferenceInDays(lastTimeAtHome.to) : 0;
  }

  get daysFromLastTrip() {
    return getDifferenceInDays(this.currentLocation.from);
  }

  private constructFullTravelHistory(trips: ITrip[]) {
    if (!trips.length) {
      return [this.createTrip({ countryCode: this.user.countryCode, from: this.user.born, to: null })];
    }

    const travelHistory = [] as ITrip[];
    const firstTrip = trips[0];
    const lastTrip = trips[trips.length - 1];

    if (firstTrip.countryCode !== this.user.countryCode) {
      const trip = this.createTrip({ countryCode: this.user.countryCode, from: this.user.born, to: firstTrip.from });
      travelHistory.push(trip);
    }

    trips.forEach((trip, index) => {
      travelHistory.push(trip);
      const atHome = this.getTimeBetweenTrips(trip, trips[index + 1]);
      atHome && travelHistory.push(atHome);
    });

    if (lastTrip.to && lastTrip.countryCode !== this.user.countryCode) {
      const trip = this.createTrip({ countryCode: this.user.countryCode, from: lastTrip.to, to: null });
      travelHistory.push(trip);
    }

    return travelHistory;
  }

  private getTimeBetweenTrips(currentTrip: ITrip, nextTrip: ITrip): ITrip | undefined {
    if (currentTrip.to && nextTrip && getDifferenceInDays(currentTrip.to, nextTrip.from) > 1) {
      return this.createTrip({ countryCode: this.user.countryCode, from: currentTrip.to, to: nextTrip.from });
    }
  }

  private createTrip({ countryCode, from, to }: Omit<ITrip, 'id'>): ITrip {
    return { id: crypto.randomUUID(), countryCode, from, to };
  }
}
