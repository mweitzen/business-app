import AssetsProvider from "@/context/assets";
import AssetsList from "partials/ListAssets";

const AssetsListPage = () => {
  return (
    <AssetsProvider>
      <AssetsList />
    </AssetsProvider>
  );
};

export default AssetsListPage;
