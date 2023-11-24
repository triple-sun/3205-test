import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/enums';
import { fetchFindUserDataAction } from './find-user-form.api.actions';
import { TMainPageState } from '../../types/state.type';

const mainPageInitialState: TMainPageState = {
  foundUsers: null,
  isLoaded: false
};

export const findUserForm = createSlice({
  name: NameSpace.FindUserForm,
  initialState: mainPageInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFindUserDataAction.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchFindUserDataAction.fulfilled, (state, action) => {
        state.foundUsers = action.payload;
        state.isLoaded = true;
      });
  },
});
