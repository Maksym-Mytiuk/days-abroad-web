import { RootState } from '@/app/store';

export const selectUser = ({ user }: RootState) => user.user;
