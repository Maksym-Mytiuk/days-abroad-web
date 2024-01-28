import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { saveTrips, addTrip, deleteTrip, updateTrip } from './store/tripsSlice';

import { selectTrips, selectTripById } from '@/features/Trips/store/tripsSelectors';

import { countries } from '@/common/utils/countries';

import Input from '@/common/components/Form/Input';
import Select from '@/common/components/Form/Select';
import Button from '@/common/components/Button';
import Toast, { notify } from '@/common/components/Toast';
import BinIcon from '@/common/components/Icons/BinIcon';

import './trips.scss';
import { ITrip } from '@/common/interfaces/user';

export default function Trips() {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(selectTrips);

  useEffect(() => {
    let ignore = false;
    if (!trips.length && !ignore) {
      addMoreTrip();
    }

    return () => {
      ignore = true;
    };
  }, []);

  function handleTripInput(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>, id: ITrip['id']) {
    const target = e.target as HTMLInputElement;
    const key = target.name as keyof ITrip;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    dispatch(
      updateTrip({
        id,
        changes: {
          [key]: value,
        },
      })
    );
  }

  function addMoreTrip() {
    dispatch(addTrip());
  }

  function save() {
    const isFormValid = validateFrom();
    if (isFormValid) {
      dispatch(saveTrips(trips));
      notify.success('Saved!');
    }
  }

  function deleteTripById(id: ITrip['id']) {
    dispatch(deleteTrip(id));
    notify.success('Deleted!');
  }

  function validateFrom() {
    return trips.every(({ countryCode, from }) => countryCode.length && from.length);
  }

  return (
    <>
      <h1>Add your trips</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <ul className="form-wrapper travel-list">
          {trips.map((travel) => (
            <li key={travel.id} className="travel-list-item">
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
                required={false}
                value={travel.to ?? undefined}
                onChange={(e) => handleTripInput(e, travel.id)}
              />
              <Input
                label="short trip"
                className="short-trip"
                type="checkbox"
                name="isShortTrip"
                required={false}
                checked={travel.isShortTrip}
                onChange={(e) => handleTripInput(e, travel.id)}
              />

              <BinIcon onClick={() => deleteTripById(travel.id)} />
            </li>
          ))}
        </ul>

        <Button onClick={addMoreTrip}>+ Add more</Button>
        <Button onClick={save}>Save</Button>
      </form>

      <Toast />
    </>
  );
}
