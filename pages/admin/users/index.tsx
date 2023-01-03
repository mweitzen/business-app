import UsersProvider from "@/context/users";
import UsersList from "@/partials/ListUsers";
import PageHeader from "@/components/header-page";

const UsersListPage = () => {
  return (
    <UsersProvider>
      <PageHeader header="All Company Users" />

      <UsersList />
    </UsersProvider>
  );
};

export default UsersListPage;
