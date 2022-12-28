import { useRouter } from "next/router";

const UserDetailPage = () => {
  const {
    query: { id: userId },
  } = useRouter();

  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-4xl font-thin">User Detail Page</h1>
      </header>
    </div>
  );
};

export default UserDetailPage;
