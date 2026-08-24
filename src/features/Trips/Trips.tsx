import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { saveTrips, addTrip } from './store/tripsSlice';

import { selectTrips, selectTripsId } from '@/features/Trips/store/tripsSelectors';

import Button from '@/common/components/Button';
import Toast, { notify } from '@/common/components/Toast';

import Trip from './components/Trip';
import './trips.scss';

export default function Trips() {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(selectTrips);
  const tripsId = useAppSelector(selectTripsId);

  // Seed an empty row so the form is never blank.
  useEffect(() => {
    if (!trips.length) {
      dispatch(addTrip());
    }
  }, [trips.length, dispatch]);

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

  function validateFrom() {
    return trips.every(({ countryCode, from }) => countryCode.length && from.length);
  }

  return (
    <>
      <h1>Add your trips</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <ul className="form-wrapper trip-list">
          {tripsId.map((id) => (
            <Trip key={id} id={id}></Trip>
          ))}
        </ul>

        <div className="trip-actions">
          <Button className="outline" onClick={addMoreTrip}>
            + Add more
          </Button>
          <Button onClick={save}>Save</Button>
        </div>
      </form>

      <Toast />
    </>
  );
}
