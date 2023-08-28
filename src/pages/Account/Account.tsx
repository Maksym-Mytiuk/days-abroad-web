import React from 'react';
import { useOutletContext } from 'react-router-dom';

import firebase from '../../services/Firebase';

import { IAction, USER_ACTION } from '../../hooks/useUser';

import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/Button';
import Toast, { notify } from '../../components/Toast';

import { countries } from '../../utils/countries';
import { IUser } from '../../interfaces/user';

import './account.scss';

export default function Account() {
  const [user, dispatch] = useOutletContext() as [user: IUser, dispatch: React.Dispatch<IAction>];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await firebase.addUserInfo(user);
      showToast();
    } catch (error) {
      console.error(error as string);
    }
  }

  function onChangeFormProp(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value, name } = e.target as HTMLInputElement | HTMLSelectElement;
    dispatch({ type: USER_ACTION.UPDATE_USER, payload: { [name]: value } });
  }

  function showToast() {
    notify.success('Saved!');
  }

  const { email, name, secondName, born, countryCode } = user;
  return (
    <>
      <h1>Profile</h1>
      <form onSubmit={onSubmit} className="account-form">
        <Input name="email" onChange={onChangeFormProp} value={email} disabled />
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
  );
}
