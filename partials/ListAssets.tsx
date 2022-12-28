import { useRouter } from "next/router";
import { classNames } from "@/lib/helpers";
import { useAssetsContext } from "@/context/assets";
import Link from "next/link";

const AssetsList = () => {
  const router = useRouter();

  const { assets, isFetching } = useAssetsContext();

  return (
    <div>
      <header className="flex justify-between">
        <h1>All Assets</h1>
        <Link href="/assets/create">Create New</Link>
      </header>

      {/* search bar */}
      <div>
        <input
          type="search"
          name="userSearch"
          placeholder="Start typing name"
        />
      </div>

      {/* filters */}
      <div className="flex">
        {["Type", "Brand", "Status"].map((option) => (
          <div
            key={option}
            className={classNames(
              `rounded-full border px-8 py-2 shadow shadow-purple-300`
            )}
          >
            {option}
          </div>
        ))}
      </div>
      {/* List */}
      <table className="w-full table-auto">
        <colgroup>
          <col />
        </colgroup>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Type</th>
            <th className="text-left">Assigned To</th>
            <th className="text-left">Status</th>
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
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.assignedTo ? asset.assignedTo.name : "-"}</td>
                <td>{asset.status}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsList;
