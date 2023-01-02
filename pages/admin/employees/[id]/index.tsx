import { useRouter } from "next/router";
import PageHeader from "@/components/header-page";

const UserDetailPage = () => {
  const {
    query: { id: userId },
  } = useRouter();

  return (
    <div>
      <PageHeader header="User Detail Page" />
    </div>
  );
};

export default UserDetailPage;
