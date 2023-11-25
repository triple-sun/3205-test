import { TFindUserDTO, TUser } from '@3205-test/common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import AppDispatch from '../../types/app-dispatch.type';
import { State } from '../../types/state.type';
import { APIRoute, Action } from '../../const/enums';

export type TMainPageData = {
  foundUser: TUser | null;
};

export const fetchFindUserDataAction = createAsyncThunk<
  TUser[],
  TFindUserDTO,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.FetchFindUserFormData, async ({ email, number}, { dispatch, extra: api }) => {
  const { data: users } = await api.get<TUser[]>(`${APIRoute.Users}?email=${email}${number ? `&number=${number}` : ''}`);
  return users;
});

export const resetFindUserDataAction = createAsyncThunk<
  unknown,
  void,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  Action.ResetFindUserFormData,
  async (_arg, { dispatch, extra: api }) => {
    return;
  }
);

