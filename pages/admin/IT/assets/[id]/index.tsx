import Link from "next/link";
import axios from "axios";
//
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
//
import { AssetStatus } from "@prisma/client";
//
import AssetAssignModal from "partials/ModalAssetAssign";
import AssetReAssignModal from "partials/ModalAssetReAssign";
import AssetUnassignModal from "partials/ModalAssetUnAssign";
//
import CardBase from "@/components/card";
import ButtonBase from "@/components/button";
import PageHeader from "@/components/header-page";

/*
 *
 * ASSET DETAIL PAGE
 *
 */
const AssetDetailPage = () => {
  const {
    query: { id: assetId },
    ...rest
  } = useRouter();
  console.log(rest);

  const { data: asset, status } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/assets/${assetId}`);
      return data;
    },
    retry: false,
  });

  if (status === "error") {
    return (
      <div className="text-center">
        <h1>Error Boundary</h1>
        <p>Something happened, or</p>
        <p>Asset does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader header="Asset Detail Page" />

      <CardBase>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-y-4">
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
            {asset.status === AssetStatus.AVAILABLE ? (
              <AssetAssignModal asset={asset} />
            ) : null}
            {asset.status === AssetStatus.ASSIGNED ? (
              <>
                <AssetReAssignModal asset={asset} />
                <AssetUnassignModal asset={asset} />
              </>
            ) : null}
            <Link href={`/assets/${asset.id}/history`} className="rounded-full">
              <ButtonBase className="w-full">Assignment History</ButtonBase>
            </Link>
            <ButtonBase>Mark a Condition Change</ButtonBase>
            <ButtonBase>Submit a Service Ticket</ButtonBase>
            <ButtonBase>Retire Asset</ButtonBase>
          </div>
        )}
      </CardBase>
    </div>
  );
};

export default AssetDetailPage;
