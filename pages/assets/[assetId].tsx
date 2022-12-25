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
        <div>Loading...</div>
      ) : (
        <div>
          <p>{asset.name}</p>
          <p>{asset.type}</p>
          <p>{asset.serialNumber}</p>
        </div>
      )}
    </div>
  );
};

export default AssetDetailPage;
