import UsersProvider from "@/context/users";
import PageHeader from "@/components/page-header";
import UsersList from "partials/ListUsers";

const UsersListPage = () => {
  return (
    <UsersProvider>
      <PageHeader header="Company Employees" />
      <UsersList />
    </UsersProvider>
  );
};

export default UsersListPage;
