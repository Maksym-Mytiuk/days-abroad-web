import { useOutletContext } from 'react-router-dom';

import firebase from '../../services/Firebase';

import { IAction, USER_ACTION } from '../../hooks/useUser';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/Button';
import Toast, { notify } from '../../components/Toast';

import { IUser } from '../../interfaces/user';
import { countries } from '../../utils/countries';

import './travel-history.scss';
import BinIcon from '../../components/Icons/BinIcon';
import { useEffect } from 'react';

export default function TravelHistory() {
  const [user, dispatch] = useOutletContext() as [user: IUser, dispatch: React.Dispatch<IAction>];
  const trips = user.travelHistory.slice();

  useEffect(() => {
    let ignore = false;
    if (!trips.length && !ignore) {
      addMoreTrip();
    }

    return () => {
      ignore = true;
    };
  }, []);

  function handleTripInput(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>, id: string) {
    const { value, name } = e.target as HTMLInputElement;

    const updatedTrips = trips.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    dispatch({ type: USER_ACTION.UPDATE_TRIPS, payload: updatedTrips });
  }

  function addMoreTrip() {
    dispatch({ type: USER_ACTION.ADD_TRIP });
  }

  async function save() {
    const isFormValid = valiadateFrom();
    if (isFormValid) {
      try {
        await firebase.addTravelHistory(trips);
        notify.success('Saved!');
      } catch (error) {
        console.error(error as string);
      }
    }
  }

  async function deleteTrip(id: string) {
    const travelHistory = trips.filter((trip) => trip.id !== id);
    try {
      dispatch({ type: USER_ACTION.DELETE_TRIP, payload: travelHistory });
      await firebase.deleteTrip(travelHistory);
      notify.success('Deleted!');
    } catch (error) {
      console.error(error as string);
    }
  }

  function valiadateFrom() {
    return trips.every(({ countryCode, from, to }) => countryCode.length && from.length && to?.length);
  }

  return (
    <>
      <h1>Add your trips</h1>

      <form className="travel-form" onSubmit={(e) => e.preventDefault()}>
        {trips.map((travel) => (
          <div key={travel.id} className="travel-wrapper">
            <Select
              className="country-select"
              name="countryCode"
              label="Country"
              defaultValue="Choose country"
              value={travel.countryCode}
              options={countries}
              onChange={(e) => handleTripInput(e, travel.id)}
            />

            <Input
              className="data-input"
              type="date"
              name="from"
              value={travel.from}
              onChange={(e) => handleTripInput(e, travel.id)}
            />
            <Input
              className="data-input"
              type="date"
              name="to"
              value={travel.to ?? undefined}
              onChange={(e) => handleTripInput(e, travel.id)}
            />
            <BinIcon onClick={() => deleteTrip(travel.id)} />
          </div>
        ))}

        <Button onClick={addMoreTrip}>+ Add more</Button>
        <Button onClick={save}>Save</Button>
      </form>

      <Toast />
    </>
  );
}
