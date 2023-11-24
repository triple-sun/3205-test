import { store } from '../store/store';
import { TUser } from '@3205-test/common';

export type State = ReturnType<typeof store.getState>;

export type TMainPageState = {
  foundUsers: TUser[] | null;
  isLoaded: boolean;
}

