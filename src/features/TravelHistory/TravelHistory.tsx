import { useEffect } from 'react';

import { useAppSelector } from '@/app/store';
import { selectTravelHistory } from '@/features/TravelHistory/store/travelHistorySelectors';

import userDB from '@/common/services/db/User';
import { countries } from '@/common/utils/countries';

import Input from '@/common/components/Form/Input';
import Select from '@/common/components/Form/Select';
import Button from '@/common/components/Button';
import Toast, { notify } from '@/common/components/Toast';
import BinIcon from '@/common/components/Icons/BinIcon';

import './travel-history.scss';

export default function TravelHistory() {
  const travelHistory = useAppSelector(selectTravelHistory);

  useEffect(() => {
    let ignore = false;
    if (!travelHistory.length && !ignore) {
      addMoreTrip();
    }

    return () => {
      ignore = true;
    };
  }, []);

  function handleTripInput(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>, id: string) {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const updatedTrips = travelHistory.map((item) => {
      if (item.id === id) {
        return { ...item, [target.name]: value };
      }
      return item;
    });

    // dispatch({ type: USER_ACTION.UPDATE_TRIPS, payload: updatedTrips });
  }

  function addMoreTrip() {
    // dispatch({ type: USER_ACTION.ADD_TRIP });
  }

  function save() {
    const isFormValid = validateFrom();
    if (isFormValid) {
      const sortedTrips = sortTrips();
      userDB.save({ travelHistory: sortedTrips });
      notify.success('Saved!');
    }
  }

  function deleteTrip(id: string) {
    const trips = travelHistory.filter((trip) => trip.id !== id);
    userDB.save({ travelHistory });
    // dispatch({ type: USER_ACTION.DELETE_TRIP, payload: trips });
    notify.success('Deleted!');
  }

  function sortTrips() {
    return travelHistory.sort((current, next) => Date.parse(current.from) - Date.parse(next.from));
  }

  function validateFrom() {
    return travelHistory.every(({ countryCode, from }) => countryCode.length && from.length);
  }

  return (
    <>
      <h1>Add your trips</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <ul className="form-wrapper travel-list">
          {travelHistory.map((travel) => (
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

              <BinIcon onClick={() => deleteTrip(travel.id)} />
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
