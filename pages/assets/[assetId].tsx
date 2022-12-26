import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const AssetDetailPage = () => {
  const {
    query: { assetId },
  } = useRouter();

  const {
    data: asset,
    fetchStatus,
    isFetching,
  } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/assets/${assetId}`);

      return data;
    },
  });

  return (
    <div>
      <h1>Asset Detail Page</h1>
      {fetchStatus === "fetching" ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid gap-y-8 p-8 text-center">
          <p>{asset.name}</p>
          <p>{asset.type}</p>
          <p>{asset.serialNumber}</p>
          <p>{asset.assignedTo ? asset.assignedTo.name : "unassigned"}</p>
          <button
            className="mx-auto rounded-lg bg-green-300 p-4"
            onClick={async () => {
              const { data } = await axios.post(
                `/api/assets/${assetId}/assign`,
                {
                  userId: "clc5b1ho600009keho34goxwt",
                }
              );
            }}
          >
            Assign
          </button>
          <button
            className="mx-auto rounded-lg bg-green-300 p-4"
            onClick={async () => {
              const { data } = await axios.post(
                `/api/assets/${assetId}/reassign`,
                {
                  userId: "clc5cwmxw00009kh89p6szob6",
                }
              );
            }}
          >
            Re-Assign
          </button>
          <button
            className="mx-auto rounded-lg bg-green-300 p-4"
            onClick={async () => {
              const { data } = await axios.post(
                `/api/assets/${asset.id}/unassign`
              );
            }}
          >
            Un-Assign
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetDetailPage;
