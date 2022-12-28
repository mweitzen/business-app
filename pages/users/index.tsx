import UsersProvider from "@/context/users";
import UsersList from "partials/ListUsers";

const UsersListPage = () => {
  return (
    <UsersProvider>
      <UsersList />
    </UsersProvider>
  );
};

export default UsersListPage;
