import { RootState } from '@/app/store';
import { tripsAdapter } from './tripsSlice';
import { ITrip } from '@/common/interfaces/user';

export const tripsSelector = tripsAdapter.getSelectors<RootState>((state) => state.trips);

export const selectTrips = tripsSelector.selectAll;
export const selectTripsId = tripsSelector.selectIds;
export const selectTripById = (id: ITrip['id']) => (state: RootState) => tripsSelector.selectById(state, id);
