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

  const searchQuery = searchText ? `search=${searchText}` : "";
  const filterArray = [
    ...selectedFilterBrand,
    ...selectedFilterTypes,
    ...selectedFilterStatus,
  ];
  const filterQuery =
    filterArray.length !== 0 ? `filter=${filterArray.join(", ")}` : "";

  const queryString =
    !!searchQuery || !!filterQuery ? `?${searchQuery}&${filterQuery}` : "";

  const { data: users, isFetching } = useQuery({
    queryKey: [
      "users",
      searchText,
      ...selectedFilterTypes,
      ...selectedFilterBrand,
      ...selectedFilterStatus,
    ],
    queryFn: async () => {
      if (!!searchText) {
        const { data } = await axios.get(`/api/users${queryString}`);
        return data;
      }
      const { data } = await axios.get("/api/users");
      return data;
    },
    refetchOnWindowFocus: false,
  });

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
