import axios from "axios";
//
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
//
import AssetAssignModal from "partials/ModalAssetAssign";
import AssetReAssignModal from "partials/ModalAssetReAssign";
import AssetUnassignModal from "partials/ModalAssetUnAssign";
import CardBase from "@/components/card";

/*
 *
 * ASSET DETAIL PAGE
 *
 */
const AssetDetailPage = () => {
  const {
    query: { id: assetId },
  } = useRouter();

  const { data: asset, status } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/assets/${assetId}`);
      return data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (status === "error" || !asset) {
    return (
      <div className="text-center">
        <h1>Error Boundary</h1>
        <p>Asset does not exist</p>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-4xl font-thin">Asset Detail Page</h1>
      </header>

      <CardBase>
        {status === "loading" ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid gap-y-4 p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Name:{" "}
              </p>
              <p>{asset.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Type:{" "}
              </p>
              <p>{asset.type}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Serial Number:{" "}
              </p>
              <p>{asset.serialNumber}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Assigned To:{" "}
              </p>
              <p>{asset.assignedTo ? asset.assignedTo.name : "unassigned"}</p>
            </div>
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
      </CardBase>
    </div>
  );
};

export default AssetDetailPage;
