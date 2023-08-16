export interface IUser {
  name: string;
  secondName: string;
  country: string;
  countryCode: string;
  born: string;
  travelHistory: ITravelHistory[];
}

export interface ITravelHistory {
  countryCode: string;
  country: string;
  from: number;
  to: number | null;
}
