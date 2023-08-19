export interface IUser {
  name: string;
  secondName: string;
  country: string;
  countryCode: string;
  born: string;
  travelHistory: ITravelHistory[];
}

export interface ITravelHistory {
  id: string;
  countryCode: string;
  from: string;
  to: string | null;
}
