import React from "react";
import { useRouter } from "next/router";
import { useUsersContext } from "@/context/users";
import { IFilterSelect } from "@/components/select-filter";
import ListBase from "@/components/list";

const UsersList = () => {
  const { push, asPath } = useRouter();

  const { users, isLoading, searchText, setSearchText } = useUsersContext();

  const userFilters: IFilterSelect[] = [
    {
      label: "Departments",
      value: [],
      setValue: null,
      options: [
        { label: "Artistic", value: "artistic" },
        { label: "Administration", value: "administration" },
        { label: "Advancement", value: "advancement" },
        { label: "Office of the Executive Director", value: "" },
      ],
    },
  ];
  return (
    <ListBase
      search={{
        name: "userSearch",
        placeholder: "Search by employee name or email",
        value: searchText,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value),
      }}
      filters={userFilters}
    >
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
          {isLoading ? (
            <tr>
              <td colSpan={2}>Loading</td>
            </tr>
          ) : users?.length > 0 ? (
            users?.map((user: any) => (
              <tr
                key={user.id}
                className="odd:bg-slate-100 hover:cursor-pointer hover:bg-slate-200"
                onClick={() => push(`${asPath}/${user.id}/assets`)}
              >
                <td className="py-1.5 text-sm">{user.name}</td>
                <td className="py-1.5 text-sm">{user.email}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </ListBase>
  );
};

export default UsersList;
