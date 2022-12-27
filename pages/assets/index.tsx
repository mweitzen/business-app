import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const AssetsListPage = () => {
  const router = useRouter();

  // const [filter,]

  const { data: assets, isFetching } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axios.get("/api/assets");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <header className="flex justify-between">
        <h1>All Assets</h1>
        <Link href="/assets/create">Create New</Link>
      </header>

      {/* List */}
      <table className="w-full">
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
                className="odd:bg-slate-50 hover:cursor-pointer hover:bg-slate-100"
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

export default AssetsListPage;
