import React from "react";
import { useRouter } from "next/router";
import { useAssetsContext } from "@/context/assets";
import { IFilterSelect } from "@/components/select-filter";
import ListBase from "@/components/list";

const AssetsList = () => {
  const router = useRouter();

  const {
    assets,
    choices,
    isFetching,
    searchText,
    setSearchText,
    selectedFilterBrand,
    selectedFilterStatus,
    selectedFilterTypes,
    setSelectedFilterBrand,
    setSelectedFilterStatus,
    setSelectedFilterTypes,
  } = useAssetsContext();

  const assetFilters: IFilterSelect[] = [
    {
      label: "Type",
      value: selectedFilterTypes,
      setValue: setSelectedFilterTypes,
      options: choices.types.map((choice) => ({
        label: choice.toLowerCase().replace("_", " "),
        value: choice,
      })),
    },
    {
      label: "Brand",
      value: selectedFilterBrand,
      setValue: setSelectedFilterBrand,
      options: choices.brands.map((choice) => ({
        label: choice.toLowerCase().replace("_", " "),
        value: choice,
      })),
    },
    {
      label: "Status",
      value: selectedFilterStatus,
      setValue: setSelectedFilterStatus,
      options: choices.status.map((choice) => ({
        label: choice.toLowerCase().replace("_", " "),
        value: choice,
      })),
    },
  ];

  return (
    <ListBase
      search={{
        name: "assetSearch",
        placeholder: "Search by name or assigned to...",
        value: searchText,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value),
      }}
      filters={assetFilters}
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
            <th className="hidden py-1.5 text-left text-xs uppercase tracking-widest text-muted sm:block">
              Brand
            </th>
            <th className="py-1.5 text-left text-xs uppercase tracking-widest text-muted">
              Type
            </th>
            <th className="hidden py-1.5 text-left text-xs uppercase tracking-widest text-muted sm:block">
              Assigned To
            </th>
            <th className="py-1.5 text-left text-xs uppercase tracking-widest text-muted">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td colSpan={5}>Loading</td>
            </tr>
          ) : assets?.length > 0 ? (
            assets?.map((asset: any) => (
              <tr
                key={asset.id}
                className="odd:bg-slate-100 hover:cursor-pointer hover:bg-slate-200"
                onClick={() => router.push(`/assets/${asset.id}`)}
              >
                <td className="truncate py-1.5">{asset.name}</td>
                <td className="hidden py-1.5 sm:block">{asset.brand}</td>
                <td className="py-1.5 capitalize">
                  {asset.type.toLowerCase().replace("_", " ")}
                </td>
                <td className="hidden truncate py-1.5 sm:block">
                  {asset.assignedTo ? asset.assignedTo.name : "-"}
                </td>
                <td className="py-1.5 capitalize">{asset.status}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </ListBase>
  );
};

export default AssetsList;
