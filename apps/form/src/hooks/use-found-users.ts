import { useCallback, useEffect, useState } from 'react';
import {
  getIsUsersLoaded,
  getUsers,
} from '../store/find-user-form/find-user-form.selectors';
import useAppSelector from './use-app-selector';
import useAppDispatch from './use-app-dispatch';
import { TFindUserDTO } from '@3205-test/common';
import {
  resetFindUserDataAction,
  fetchFindUserDataAction,
} from '../store/find-user-form/find-user-form.api.actions';

const useFoundUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false)

  const users = useAppSelector(getUsers);
  const isLoaded = useAppSelector(getIsUsersLoaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoaded && isLoading) {
      setIsLoading(false)
    }

  }, [isLoaded, isLoading])


  const handleFindUserSubmit = useCallback(
    (data: TFindUserDTO) => {
      dispatch(fetchFindUserDataAction(data));
      setIsLoading(true)
      setShowData(true)
    },
    [dispatch]
  );

  const handleFindUserReset = useCallback(() => {
    dispatch(resetFindUserDataAction());
    setIsLoading(false);
    setShowData(false)
  }, [dispatch]);

  return {
    users,
    isLoaded,
    isLoading,
    showData,
    handleFindUserSubmit,
    handleFindUserReset,
  };
};

export default useFoundUsers;
