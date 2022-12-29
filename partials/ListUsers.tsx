import { useUsersContext } from "@/context/users";
import { classNames } from "@/lib/helpers";
import { useRouter } from "next/router";

const UsersList = () => {
  const router = useRouter();

  const { users, isFetching, searchText, setSearchText } = useUsersContext();

  return (
    <div>
      <div className="mb-6 space-y-2">
        {/* search bar */}
        <div>
          <input
            type="search"
            name="userSearch"
            placeholder="Search by employee name or email"
            className="w-full rounded-full border border-neutral-200 bg-element py-2 pl-3 pr-10 focus:border-transparent focus:ring-purple-300"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* filters */}
        <div className="flex gap-x-2">
          {["Department", "Region", "Office Location"].map((option) => (
            <div
              key={option}
              className={classNames(
                `rounded-full border px-8 py-2 text-xs shadow shadow-purple-300`
              )}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <table className="w-full table-auto">
        <colgroup>
          <col />
        </colgroup>
        <thead>
          <tr>
            <th className="py-1.5 text-left text-xs uppercase tracking-widest text-muted">
              Name
            </th>
            <th className="py-1.5 text-left text-xs uppercase tracking-widest text-muted">
              Email
            </th>
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
                className="odd:bg-slate-100 hover:cursor-pointer hover:bg-slate-200"
                onClick={() => router.push(`/users/${user.id}/assets`)}
              >
                <td className="py-1.5 text-sm">{user.name}</td>
                <td className="py-1.5 text-sm">{user.email}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
