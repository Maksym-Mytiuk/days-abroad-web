import React from 'react';
import { useOutletContext } from 'react-router-dom';

import userDB from '@/common/services/db/User';

import { IAction, USER_ACTION } from '@/common/hooks/useUser';

import Input from '@/common/components/Form/Input';
import Select from '@/common/components/Form/Select';
import Button from '@/common/components/Button';
import Toast, { notify } from '@/common/components/Toast';

import { countries } from '@/common/utils/countries';
import { IUser } from '@/common/interfaces/user';

import './account.scss';

export default function Account() {
  const [user, dispatch] = useOutletContext() as [user: IUser, dispatch: React.Dispatch<IAction>];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    userDB.save(user);
    showToast();
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
      <form onSubmit={onSubmit} className="form-wrapper account-form">
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
