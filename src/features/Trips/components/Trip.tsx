import { memo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { deleteTripById, updateTripById } from '../store/tripsSlice';
import { selectTripById } from '../store/tripsSelectors';

import { ITrip } from '@/common/interfaces/user';
import { countries } from '@/common/utils/countries';

import Input from '@/common/components/Form/Input';
import Select from '@/common/components/Form/Select';
import BinIcon from '@/common/components/Icons/BinIcon';
import { notify } from '@/common/components/Toast';

import './trip.scss';

type TripProps = {
  id: ITrip['id'];
};

function Trip({ id }: TripProps) {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectTripById(id));

  function handleTripInput(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const key = target.name as keyof ITrip;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    dispatch(
      updateTripById({
        id,
        changes: {
          [key]: value,
        },
      })
    );
  }

  // TODO Need to save after delete
  function deleteTrip() {
    dispatch(deleteTripById(id));
    notify.success('Deleted!');
  }

  return (
    <li className="trip">
      <Select
        className="country-select"
        name="countryCode"
        label="Country"
        defaultValue="Choose country"
        value={trip.countryCode}
        options={countries}
        onChange={handleTripInput}
      />

      <Input className="data-input" type="date" name="from" value={trip.from} onChange={handleTripInput} />
      <Input
        className="data-input"
        type="date"
        name="to"
        required={false}
        value={trip.to ?? undefined}
        onChange={handleTripInput}
      />
      <Input
        label="short trip"
        className="short-trip"
        type="checkbox"
        name="isShortTrip"
        required={false}
        checked={trip.isShortTrip}
        onChange={handleTripInput}
      />

      <BinIcon onClick={deleteTrip} />
    </li>
  );
}

export default memo(Trip);
