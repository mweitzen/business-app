import UsersProvider from "@/context/users";
import UsersList from "partials/ListUsers";

const UsersListPage = () => {
  return (
    <UsersProvider>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-4xl font-thin">Company Employees</h1>
      </header>
      <UsersList />
    </UsersProvider>
  );
};

export default UsersListPage;
