import { useUsersContext } from "@/context/users";
import { classNames } from "@/lib/helpers";
import { useRouter } from "next/router";

const UsersList = () => {
  const router = useRouter();

  const { users, isFetching, setSearchText, searchText } = useUsersContext();

  return (
    <div>
      <header className="flex justify-between">
        <h1>All Users</h1>
      </header>

      {/* search bar */}
      <div>
        <input
          type="search"
          name="userSearch"
          placeholder="Start typing employee name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* filters */}
      <div className="flex">
        {["1", "2", "3"].map((option) => (
          <div
            key={option}
            className={classNames(`rounded-full border px-8 py-2`)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* List */}
      <table className="w-full table-auto">
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
                onClick={() => router.push(`/users/${user.id}/assets`)}
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

export default UsersList;
