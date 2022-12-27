import useUsers from "hooks/useUsers";
import React from "react";
import AutocompleteInput from "./input-autocomplete";

type SelectUserProps = {
  user: any;
  setUser: (val: any) => void;
};

const SelectUser = ({ user, setUser }: SelectUserProps) => {
  const { data, isFetching } = useUsers();

  if (isFetching) return <div>Loading...</div>;

  return (
    <AutocompleteInput
      options={data}
      placeholder="Select an employee or start typing"
    />
  );
};

export default SelectUser;
