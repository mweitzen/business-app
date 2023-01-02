import UsersProvider from "@/context/users";
import UsersList from "@/partials/ListUsers";
import PageHeader from "@/components/header-page";

const UsersListPage = () => {
  return (
    <UsersProvider>
      <PageHeader header="Company Employees" />
      <UsersList />
    </UsersProvider>
  );
};

export default UsersListPage;
