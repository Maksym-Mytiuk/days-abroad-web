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

  private constructFullTravelHistory(trips: ITrip[]): ITrip[] {
    if (!trips.length) {
      return [this.createBaseTrip(this.user.born, null)];
    }

    trips = trips.filter((trip) => !trip.isShortTrip);
    const travelHistory: ITrip[] = [];

    this.addInitialHomeTripIfNeeded(trips, travelHistory);
    this.addTripsWithHomeIntervals(trips, travelHistory);
    this.addFinalHomeTripIfNeeded(trips, travelHistory);

    return travelHistory;
  }

  private addInitialHomeTripIfNeeded(trips: ITrip[], travelHistory: ITrip[]): void {
    const firstTrip = trips[0];
    if (firstTrip.countryCode !== this.user.countryCode) {
      travelHistory.push(this.createBaseTrip(this.user.born, firstTrip.from));
    }
  }

  private addTripsWithHomeIntervals(trips: ITrip[], travelHistory: ITrip[]): void {
    trips.forEach((trip, index) => {
      travelHistory.push(trip);
      const atHomeTrip = this.getTimeBetweenTrips(trip, trips[index + 1]);
      if (atHomeTrip) travelHistory.push(atHomeTrip);
    });
  }

  private addFinalHomeTripIfNeeded(trips: ITrip[], travelHistory: ITrip[]): void {
    const lastTrip = trips[trips.length - 1];
    if (lastTrip.to && lastTrip.countryCode !== this.user.countryCode) {
      travelHistory.push(this.createBaseTrip(lastTrip.to, null));
    }
  }

  private getTimeBetweenTrips(currentTrip: ITrip, nextTrip?: ITrip): ITrip | undefined {
    if (currentTrip.to && nextTrip && getDifferenceInDays(currentTrip.to, nextTrip.from) > 1) {
      return this.createBaseTrip(currentTrip.to, nextTrip.from);
    }
  }

  private createBaseTrip(from: string, to: string | null): ITrip {
    return { id: crypto.randomUUID(), countryCode: this.user.countryCode, from, to, isShortTrip: false };
  }
}
