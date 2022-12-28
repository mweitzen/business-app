import { useRouter } from "next/router";
import { classNames } from "@/lib/helpers";
import { useAssetsContext } from "@/context/assets";

const AssetsList = () => {
  const router = useRouter();

  const { assets, isFetching, searchText, setSearchText } = useAssetsContext();

  return (
    <div>
      {/* assets querying */}
      <div className="mb-6 space-y-2">
        {/* search bar */}
        <input
          type="search"
          name="userSearch"
          placeholder="Search by name or assigned to..."
          className="w-full rounded-full border bg-element py-2 pl-3 pr-10"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* filters */}
        <div className="flex gap-x-2">
          {["Type", "Brand", "Status"].map((option) => (
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
              Type
            </th>
            <th className="py-1.5 text-left text-xs uppercase tracking-widest text-muted">
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
                <td className="py-1.5">{asset.name}</td>
                <td className="py-1.5">{asset.type}</td>
                <td className="py-1.5">
                  {asset.assignedTo ? asset.assignedTo.name : "-"}
                </td>
                <td className="py-1.5">{asset.status}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsList;
