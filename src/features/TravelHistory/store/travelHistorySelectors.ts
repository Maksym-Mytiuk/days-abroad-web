import { RootState } from '@/app/store';

export const selectTravelHistory = ({ travelHistory }: RootState) => travelHistory.travelHistory;
