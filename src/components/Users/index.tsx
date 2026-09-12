import { useEffect } from "react";
import { StoreState } from "../../types";
import { fetchUsers } from "../../redux/slices/users.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(
    (state: StoreState) => state.usersStore,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log("Component Users", users, isLoading, error);

  return <div>Users</div>;
};

export default Users;
