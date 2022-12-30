import { createContext, useContext, useState } from "react";
//
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
//
import getChoices from "@/lib/common/getChoices";
import { OptionProps } from "@/types";
import { stat } from "fs";

interface IAssetsContext {
  searchText: string;
  selectedFilterTypes: OptionProps[];
  selectedFilterBrand: OptionProps[];
  selectedFilterStatus: OptionProps[];
  setSearchText: (val: string) => void;
  setSelectedFilterTypes: (any: any) => void;
  setSelectedFilterBrand: (any: any) => void;
  setSelectedFilterStatus: (any: any) => void;
  assets: any[];
  choices: {
    types: string[];
    brands: string[];
    status: string[];
  };
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
  choices: {
    types: [],
    brands: [],
    status: [],
  },
  isFetching: false,
};

const AssetsContext = createContext<IAssetsContext>(initialState);

const AssetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilterTypes, setSelectedFilterTypes] = useState([]);
  const [selectedFilterBrand, setSelectedFilterBrand] = useState([]);
  const [selectedFilterStatus, setSelectedFilterStatus] = useState([]);

  const { data: _assets, isFetching } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/assets`);
      return data;
    },
    staleTime: Infinity,
  });

  const typeChoices = getChoices(_assets, "type");
  const brandChoices = getChoices(_assets, "brand");
  const statusChoices = getChoices(_assets, "status");

  let assets = _assets;
  if (!!assets) {
    if (!!searchText) {
      assets = _assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (asset.assignedTo &&
            asset.assignedTo.name
              .toLowerCase()
              .includes(searchText.toLowerCase()))
      );
    }

    if (selectedFilterTypes.length !== 0) {
      assets = assets.filter((asset) =>
        selectedFilterTypes.includes(asset.type)
      );
    }

    if (selectedFilterBrand.length !== 0) {
      assets = assets.filter((asset) =>
        selectedFilterBrand.includes(asset.brand)
      );
    }

    if (selectedFilterStatus.length !== 0) {
      assets = assets.filter((asset) =>
        selectedFilterStatus.includes(asset.status)
      );
    }
  }

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
        choices: {
          types: typeChoices,
          brands: brandChoices,
          status: statusChoices,
        },
        isFetching,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export default AssetsProvider;

export const useAssetsContext = () => useContext(AssetsContext);
