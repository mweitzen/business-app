import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import AssetAssignModal from "partials/ModalAssetAssign";
import AssetReAssignModal from "partials/ModalAssetReAssign";
import AssetUnassignModal from "partials/ModalAssetUnAssign";

const AssetDetailPage = () => {
  const {
    query: { id: assetId },
  } = useRouter();

  const { data: asset, fetchStatus } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/assets/${assetId}`);
      return data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (fetchStatus === "idle" && !asset)
    return (
      <div className="text-center">
        <h1>Error Boundary</h1>
        <p>Asset does not exist</p>
      </div>
    );

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
          {asset.status === "available" ? (
            <AssetAssignModal asset={asset} />
          ) : null}
          {asset.status === "assigned" ? (
            <>
              <AssetReAssignModal asset={asset} />
              <AssetUnassignModal asset={asset} />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AssetDetailPage;
