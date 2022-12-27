import axios from "axios";
import Link from "next/link";
//
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const UsersListPage = () => {
  const router = useRouter();

  // const [filter,]

  const { data: users, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <header className="flex justify-between">
        <h1>All Users</h1>
        <Link href="/users/create">Create New</Link>
      </header>

      {/* List */}
      <table className="w-full">
        <colgroup>
          <col />
        </colgroup>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td colSpan={2}>Loading</td>
            </tr>
          ) : users?.length > 0 ? (
            users?.map((user: any) => (
              <tr
                key={user.id}
                className="odd:bg-slate-50 hover:cursor-pointer hover:bg-slate-100"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <td className="text-sm">{user.name}</td>
                <td className="text-sm">{user.email}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default UsersListPage;
