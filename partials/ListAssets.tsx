import { useRouter } from "next/router";
import { useAssetsContext } from "@/context/assets";
import FilterSelect, { IFilterSelect } from "@/components/select-filter";

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
    <div>
      {/* assets querying */}
      <div className="mb-6 space-y-3">
        {/* search bar */}
        <input
          type="search"
          name="userSearch"
          placeholder="Search by name or assigned to..."
          className="w-full rounded-full border border-neutral-200 bg-element py-2 pl-3 pr-10 focus:border-transparent focus:ring-purple-300"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* filters */}
        <div className="flex gap-x-2">
          {assetFilters.map((option, i) => (
            <FilterSelect key={i} {...option} />
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
    </div>
  );
};

export default AssetsList;
