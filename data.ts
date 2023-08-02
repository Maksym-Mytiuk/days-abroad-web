export interface IAbroad {
  user: IUser;
  travelHistory: ITravelHistory[];
}

export interface IUser {
  name: string;
  secondName: string;
  country: string;
  countryCode: string;
  birth: Date;
}

export interface ITravelHistory {
  countryCode: string;
  country: string;
  from: Date;
  to: Date | null;
}

// new(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;

export const data = {
  user: {
    name: 'Maksym',
    secondName: 'Mytiuk',
    country: 'Ukraine',
    countryCode: 'ua',
    birth: new Date(1994, 1, 17),
  },
  travelHistory: [
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(1994, 1, 17), to: new Date(2008, 6, 12) },
    { countryCode: 'pl', country: 'Poland', from: new Date(2008, 6, 12), to: new Date(2008, 7, 1) },
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(2008, 7, 1), to: new Date(2014, 8, 25) },
    { countryCode: 'pl', country: 'Poland', from: new Date(2014, 8, 25), to: new Date(2015, 1, 6) },
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(2015, 1, 6), to: new Date(2015, 3, 22) },
    { countryCode: 'lt', country: 'Lithuania', from: new Date(2015, 3, 22), to: new Date(2015, 3, 25) },
    { countryCode: 'fl', country: 'Finland', from: new Date(2015, 3, 25), to: new Date(2015, 4, 25) },
    { countryCode: 'ee', country: 'Estonia', from: new Date(2015, 4, 25), to: new Date(2015, 4, 27) },
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(2015, 4, 27), to: new Date(2015, 4, 29) },
    { countryCode: 'pl', country: 'Poland', from: new Date(2018, 5, 29), to: new Date(2018, 5, 29) },
    {
      countryCode: 'cz',
      country: 'Czech Republic',
      from: new Date(2018, 5, 29),
      to: new Date(2018, 6, 2),
    },
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(2018, 6, 2), to: new Date(2019, 7,4) },
    { countryCode: 'hu', country: 'Hungary', from: new Date(2019, 7, 4), to: new Date(2019, 7, 5) },
    { countryCode: 'sk', country: 'Slovakia', from: new Date(2019, 7, 5), to: new Date(2019, 7, 6) },
    { countryCode: 'at', country: 'Austria', from: new Date(2019, 7, 6), to: new Date(2019, 7, 7) },
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(2019, 7, 7), to: new Date(2019, 7, 7) },
    {
      countryCode: 'de',
      country: 'Germany',
      from: new Date(2019, 11, 14),
      to: new Date(2019, 11, 17),
    },
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(2019, 11, 17), to: new Date(2021, 7, 31) },
    { countryCode: 'cy', country: 'Cyprus', from: new Date(2021, 7, 31), to: new Date(2021, 8, 9) },
    //   { countryCode: 'ua', country: 'Ukraine', from: new Date(2021, 8, 9), to: new Date(2022, 1, 11) },
    { countryCode: 'cy', country: 'Cyprus', from: new Date(2022, 1, 11), to: new Date(2022, 2, 23) },
    { countryCode: 'pl', country: 'Poland', from: new Date(2022, 2, 23), to: new Date(2022, 5, 3) },
    { countryCode: 'tr', country: 'Turkey', from: new Date(2022, 5, 3), to: new Date(2022, 7, 27) },
    {
      countryCode: 'bg',
      country: 'Bulgaria',
      from: new Date(2022, 7, 27),
      to: new Date(2022, 8, 23),
    },
    { countryCode: 'pl', country: 'Poland', from: new Date(2022, 8, 23), to: new Date(2022, 10, 19) },
    {
      countryCode: 'de',
      country: 'Germany',
      from: new Date(2022, 10, 19),
      to: new Date(2022, 10, 22),
    },
    { countryCode: 'pl', country: 'Poland', from: new Date(2022, 10, 22), to: new Date(2023, 0, 3) },
    { countryCode: 'it', country: 'Italy', from: new Date(2023, 0, 3), to: new Date(2023, 0, 5) },
    { countryCode: 'pl', country: 'Poland', from: new Date(2023, 0, 5), to: new Date(2023, 1, 17) },
    { countryCode: 'cy', country: 'Cyprus', from: new Date(2023, 1, 17), to: new Date(2023, 1, 20) },
    { countryCode: 'pl', country: 'Poland', from: new Date(2023, 1, 20), to: new Date(2023, 4, 13) },
    {
      countryCode: 'uae',
      country: 'United Arab Emirates',
      from: new Date(2023, 4, 13),
      to: new Date(2023, 4, 16),
    },
    { countryCode: 'pl', country: 'Poland', from: new Date(2023, 4, 16), to: new Date(2023, 5, 11) },
    { countryCode: 'al', country: 'Albania', from: new Date(2023, 5, 11), to: null },
  ],
} as IAbroad;
