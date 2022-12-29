import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OptionProps } from "@/types";

interface IUsersContext {
  searchText: string;
  selectedFilterTypes: OptionProps[];
  selectedFilterBrand: OptionProps[];
  selectedFilterStatus: OptionProps[];
  setSearchText: (val: string) => void;
  setSelectedFilterTypes: unknown;
  setSelectedFilterBrand: unknown;
  setSelectedFilterStatus: unknown;
  users: any[];
  isFetching: boolean;
}

const initialState: IUsersContext = {
  searchText: "",
  selectedFilterTypes: [],
  selectedFilterBrand: [],
  selectedFilterStatus: [],
  setSearchText: () => {},
  setSelectedFilterTypes: () => {},
  setSelectedFilterBrand: () => {},
  setSelectedFilterStatus: () => {},
  users: [],
  isFetching: false,
};

const UsersContext = createContext<IUsersContext>(initialState);

const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilterTypes, setSelectedFilterTypes] = useState([]);
  const [selectedFilterBrand, setSelectedFilterBrand] = useState([]);
  const [selectedFilterStatus, setSelectedFilterStatus] = useState([]);

  const { data: _users, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  let users = _users;
  if (!!users) {
    if (!!searchText) {
      users = _users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // if (selectedFilterTypes.length !== 0) {
    //   users = users.filter((user) =>
    //     selectedFilterTypes.includes(user.type)
    //   );
    // }

    // if (selectedFilterBrand.length !== 0) {
    //   users = users.filter((user) =>
    //     selectedFilterBrand.includes(user.brand)
    //   );
    // }

    // if (selectedFilterStatus.length !== 0) {
    //   users = users.filter((user) =>
    //     selectedFilterStatus.includes(user.status)
    //   );
    // }
  }
  return (
    <UsersContext.Provider
      value={{
        searchText,
        selectedFilterTypes,
        selectedFilterBrand,
        selectedFilterStatus,
        setSearchText,
        setSelectedFilterTypes,
        setSelectedFilterBrand,
        setSelectedFilterStatus,
        users,
        isFetching,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

export const useUsersContext = () => useContext(UsersContext);
