import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import firebase from '../../services/Firebase';

import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import { ITravelHistory } from '../../interfaces/user';
import { IUser } from '../../interfaces/user';
import { countries } from '../../utils/countries';

import './travel-history.scss';

type TravelProp = {
  countryCode: string;
  from: string;
  to: string;
};

type User = Omit<IUser, 'travelHistory'>;

export default function TravelHistory() {
  const [travels, setTravels] = useState([] as ITravelHistory[]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!travels.length) {
      addMoreTravel();
    }
  }, []);

  useEffect(() => {
    addMoreTravel();

    // TODO REFACTOR IT REMOVE FROM ACCOUNT, AND USE FROM APP
    let ignore = false;
    async function getUserInfo() {
      try {
        const userData = await firebase.getUserInfo();
        if (!ignore && userData) {
          setTravels(userData.travelHistory);
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

  function onChangeTravelProperty(
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
    id: string,
    property: keyof TravelProp
  ) {
    const value = (e.target as HTMLInputElement).value;
    const updatedTravels = travels.map((item) => {
      if (item.id === id) {
        return { ...item, [property]: value };
      }
      return item;
    });
    setTravels(updatedTravels);
  }

  function addMoreTravel() {
    setTravels([...travels, { id: Date.now().toString(), countryCode: '', from: '', to: '' }]);
  }

  async function save() {
    try {
      await firebase.addTravelHistory(travels);
      notify();
    } catch (error) {
      console.error(error as string);
    }

    console.log(travels);
  }

  function notify() {
    // CREATE TOAST COMPONENT AND REPLACE IN ACCOUNT
    toast.success('Saved!');
  }

  return (
    <>
      <h1>Add your trips</h1>
      <form className="travel-form" onSubmit={(e) => e.preventDefault()}>
        {isLoaded ? (
          travels.map((travel) => (
            <div key={travel.id} className="travel-wrapper">
              <Select
                className="country-select"
                name="country"
                defaultValue="Choose country"
                value={travel.countryCode}
                options={countries}
                onChange={(e) => onChangeTravelProperty(e, travel.id, 'countryCode')}
              />

              <Input
                className="data-input"
                type="date"
                name="from"
                value={travel.from}
                onChange={(e) => onChangeTravelProperty(e, travel.id, 'from')}
              />
              <Input
                className="data-input"
                type="date"
                name="to"
                value={travel.to ?? undefined}
                onChange={(e) => onChangeTravelProperty(e, travel.id, 'to')}
              />
            </div>
          ))
        ) : (
          <Loader />
        )}

        <Button onClick={addMoreTravel}>+ Add more</Button>
        <Button onClick={save}>Save</Button>
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
  );
}
