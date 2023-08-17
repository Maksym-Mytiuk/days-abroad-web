import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import firebase from '../../services/Firebase';

import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/Button';

import { countries } from '../../utils/countries';
import { IUser } from '../../interfaces/user';

import './account.scss';

type User = Omit<IUser, 'travelHistory'>;

export default function Account() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState({} as User);

  useEffect(() => {
    let ignore = false;
    async function getUserInfo() {
      try {
        const userData = await firebase.getUserInfo();
        if (!ignore && userData) {
          setUserData(userData);
        }
      } catch (err) {
        console.error(err as string);
      } finally {
        setIsLoaded(true);
      }
    }

    getUserInfo();

    return () => {
      ignore = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, secondName, born, country, countryCode } = userData;

    const user = {
      name: name,
      secondName: secondName,
      born: born,
      country: country,
      countryCode: countryCode,
    } as User;

    try {
      await firebase.addUserInfo(user);
      notify();
    } catch (error) {
      console.error(error as string);
    }
  }

  function onChangeName(e: React.FormEvent<HTMLInputElement>) {
    const name = (e.target as HTMLInputElement).value;
    setUserData({ ...userData, name });
  }

  function onChangeSecondame(e: React.FormEvent<HTMLInputElement>) {
    const secondName = (e.target as HTMLInputElement).value;
    setUserData({ ...userData, secondName });
  }

  function onChangeDate(e: React.FormEvent<HTMLInputElement>) {
    const born = (e.target as HTMLInputElement).value;
    setUserData({ ...userData, born });
  }

  function onChangeCountry(e: React.FormEvent<HTMLSelectElement>) {
    const countryCode = (e.target as HTMLSelectElement).value;
    const country = countries.find((country) => country.key === countryCode)?.value || '';

    setUserData({ ...userData, countryCode, country });
  }

  function notify() {
    toast.success('Saved!');
  }

  const { name, secondName, born, countryCode } = userData;
  return (
    <>
      <h1>Profile</h1>
      {isLoaded ? (
        <>
          <form onSubmit={onSubmit}>
            <Input name="name" onChange={onChangeName} value={name} />
            <Input name="secondname" onChange={onChangeSecondame} value={secondName} />
            <Input type="date" name="born" onChange={onChangeDate} value={born} />
            <Select
              name="country"
              defaultValue="Choose country"
              options={countries}
              onChange={onChangeCountry}
              value={countryCode}
            />
            <Button className="outline">Save</Button>
          </form>
          <ToastContainer
            position="bottom-right"
            theme="light"
            autoClose={3000}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            closeOnClick
          />
        </>
      ) : (
        'Loading...'
      )}
    </>
  );
}
