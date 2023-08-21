export interface IUser {
  name: string;
  secondName: string;
  country: string;
  countryCode: string;
  born: string;
  travelHistory: ITrip[];
}

export interface ITrip {
  id: string;
  countryCode: string;
  from: string;
  to: string | null;
}
