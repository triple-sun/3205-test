import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api/api';
import { NameSpace } from '../const/enums';
import { findUserForm } from './find-user-form/find-user-form';
import { redirect } from './middlewares/redirect.middleware';

export const rootReducer = combineReducers({
  [NameSpace.FindUserForm]: findUserForm.reducer,
});

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
