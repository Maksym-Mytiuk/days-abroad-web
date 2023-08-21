import React, { useEffect, useState } from 'react';
import firebase from '../../services/Firebase';

import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Toast, { notify } from '../../components/Toast';

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

    try {
      await firebase.addUserInfo(userData);
      showToast();
    } catch (error) {
      console.error(error as string);
    }
  }

  function onChangeFormProp(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value, name } = e.target as HTMLInputElement | HTMLSelectElement;
    setUserData({ ...userData, [name]: value });
  }

  function showToast() {
    notify.success('Saved!');
  }

  const { name, secondName, born, countryCode } = userData;
  return (
    <>
      <h1>Profile</h1>
      {isLoaded ? (
        <>
          <form onSubmit={onSubmit} className="account-form">
            <Input name="name" onChange={onChangeFormProp} value={name} />
            <Input name="secondName" onChange={onChangeFormProp} value={secondName} />
            <Input type="date" name="born" onChange={onChangeFormProp} value={born} />
            <Select
              name="countryCode"
              label="Country"
              defaultValue="Choose country"
              options={countries}
              onChange={onChangeFormProp}
              value={countryCode}
            />
            <Button className="outline">Save</Button>
          </form>
          <Toast />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
