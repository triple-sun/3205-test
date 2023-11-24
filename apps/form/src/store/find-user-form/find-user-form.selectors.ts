import { createSelector } from 'reselect';
import { State } from '../../types/state.type';

export const getFindUsersState = (state: State) => state.FIND_USER_FORM;

export const getUsers = createSelector(
  getFindUsersState,
  (state) => state.foundUsers
);

export const getIsUsersLoaded = createSelector(
  getFindUsersState,
  (state) => state.isLoaded
)
