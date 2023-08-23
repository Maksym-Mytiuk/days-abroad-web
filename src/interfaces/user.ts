export interface IUser {
  name: string;
  secondName: string;
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

export const DEFAULT_USER: IUser = {
  name: '',
  secondName: '',
  countryCode: '',
  born: '',
  travelHistory: [],
};
