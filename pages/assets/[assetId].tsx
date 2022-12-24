import { useRouter } from "next/router";

const AssetDetailPage = () => {
  const {
    query: { assetId },
  } = useRouter();

  return <div>Asset Detail Page for {assetId}</div>;
};

export default AssetDetailPage;
