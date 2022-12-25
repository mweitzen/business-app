import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const AssetsListPage = () => {
  // const [filter,]

  const {
    data: assets,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => await axios.get("/api/assets"),
  });
  // return console.log(assets);
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
            assets?.map((asset) => (
              <tr className="odd:bg-slate-50">
                <td>a</td>
                <td>b</td>
                <td>c</td>
                <td>d</td>
              </tr>
            ))
          ) : (
            <>
              <tr className="odd:bg-slate-200">
                <td colSpan={5}>No Assets</td>
              </tr>
              <tr className="odd:bg-slate-200">
                <td colSpan={5}>No Assets</td>
              </tr>
              <tr className="odd:bg-slate-200">
                <td colSpan={5}>No Assets</td>
              </tr>
              <tr className="odd:bg-slate-200">
                <td colSpan={5}>No Assets</td>
              </tr>
              <tr className="odd:bg-slate-200">
                <td colSpan={5}>No Assets</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsListPage;
