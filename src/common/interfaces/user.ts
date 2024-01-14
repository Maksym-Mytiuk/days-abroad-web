export interface IUser {
  email: string;
  name: string;
  secondName: string;
  countryCode: string;
  born: string;
  travelHistory: ITrip[];
}

export interface ITrip {
  id: `${string}-${string}-${string}-${string}-${string}`;
  countryCode: string;
  from: string;
  to: string | null;
  isShortTrip: boolean;
}

export const DEFAULT_USER: IUser = {
  email: '',
  name: '',
  secondName: '',
  countryCode: '',
  born: '',
  travelHistory: [{ ...getTrip() }],
};

export function getTrip() {
  return { id: crypto.randomUUID(), countryCode: '', from: '', to: '', isShortTrip: false };
}
