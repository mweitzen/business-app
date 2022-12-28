import { createContext, useContext, useState } from "react";
//
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { OptionProps } from "@/types";

interface IAssetsContext {
  searchText: string;
  selectedFilterTypes: OptionProps[];
  selectedFilterBrand: OptionProps[];
  selectedFilterStatus: OptionProps[];
  setSearchText: (val: string) => void;
  setSelectedFilterTypes: unknown;
  setSelectedFilterBrand: unknown;
  setSelectedFilterStatus: unknown;
  assets: any[];
  isFetching: boolean;
}

const initialState: IAssetsContext = {
  searchText: "",
  selectedFilterTypes: [],
  selectedFilterBrand: [],
  selectedFilterStatus: [],
  setSearchText: () => {},
  setSelectedFilterTypes: () => {},
  setSelectedFilterBrand: () => {},
  setSelectedFilterStatus: () => {},
  assets: [],
  isFetching: false,
};

const AssetsContext = createContext<IAssetsContext>(initialState);

const AssetsProvider = ({ children }: { children: React.ReactNode }) => {
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

  const { data: assets, isFetching } = useQuery({
    queryKey: [
      "assets",
      searchText,
      ...selectedFilterTypes,
      ...selectedFilterBrand,
      ...selectedFilterStatus,
    ],
    queryFn: async () => {
      const { data } = await axios.get(`/api/assets${queryString}`);
      console.log(data);

      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <AssetsContext.Provider
      value={{
        searchText,
        selectedFilterTypes,
        selectedFilterBrand,
        selectedFilterStatus,
        setSearchText,
        setSelectedFilterTypes,
        setSelectedFilterBrand,
        setSelectedFilterStatus,
        assets,
        isFetching,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export default AssetsProvider;

export const useAssetsContext = () => useContext(AssetsContext);
