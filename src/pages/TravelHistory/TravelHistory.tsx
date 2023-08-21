import { useEffect, useState } from 'react';
import firebase from '../../services/Firebase';

import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Toast, { notify } from '../../components/Toast';

import { ITrip } from '../../interfaces/user';
import { countries } from '../../utils/countries';

import './travel-history.scss';

export default function TravelHistory() {
  const [travels, setTravels] = useState([] as ITrip[]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let ignore = false;

    if (!travels.length) {
      addMoreTravel();
    }

    // TODO REFACTOR IT REMOVE FROM ACCOUNT, AND USE FROM APP
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

  function onChangeTravelProp(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>, id: string) {
    const { value, name } = e.target as HTMLInputElement;

    const updatedTravels = travels.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
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
      notify.success('Saved!');
    } catch (error) {
      console.error(error as string);
    }
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
                name="countryCode"
                label="Country"
                defaultValue="Choose country"
                value={travel.countryCode}
                options={countries}
                onChange={(e) => onChangeTravelProp(e, travel.id)}
              />

              <Input
                className="data-input"
                type="date"
                name="from"
                value={travel.from}
                onChange={(e) => onChangeTravelProp(e, travel.id)}
              />
              <Input
                className="data-input"
                type="date"
                name="to"
                value={travel.to ?? undefined}
                onChange={(e) => onChangeTravelProp(e, travel.id)}
              />
            </div>
          ))
        ) : (
          <Loader />
        )}

        <Button onClick={addMoreTravel}>+ Add more</Button>
        <Button onClick={save}>Save</Button>
      </form>

      <Toast />
    </>
  );
}
