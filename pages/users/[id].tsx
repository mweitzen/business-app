import { useRouter } from "next/router";

const UserDetailPage = () => {
  const {
    query: { id: userId },
  } = useRouter();

  return <div>User Detail Page for {userId}</div>;
};

export default UserDetailPage;
