import { useCallback } from "react";
import { getUsers } from "../store/find-user-form/find-user-form.selectors";
import useAppSelector from "./use-app-selector";
import useAppDispatch from "./use-app-dispatch";
import { TFindUserDTO } from "@3205-test/common";
import { fetchFindUserDataAction } from "../store/find-user-form/find-user-form.api.actions";

const useFoundUsers = () => {
  const users = useAppSelector(getUsers)

  const dispatch = useAppDispatch();

  const handleFindUserSubmit = useCallback(
      (data: TFindUserDTO) => {
        dispatch(fetchFindUserDataAction(data));
      },
      [dispatch]
    );

  return {
    users,
    handleFindUserSubmit
  };
};

export default useFoundUsers;
