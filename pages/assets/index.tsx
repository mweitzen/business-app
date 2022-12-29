import Link from "next/link";
//
import AssetsProvider from "@/context/assets";
import AssetsList from "partials/ListAssets";
import PageHeader from "@/components/page-header";

const AssetsListPage = () => {
  return (
    <AssetsProvider>
      <PageHeader header="Your Company Assets">
        <Link
          href="/assets/create"
          className="grid h-8 w-8 place-content-center rounded-full text-xl shadow shadow-purple-300"
        >
          +
        </Link>
      </PageHeader>
      <AssetsList />
    </AssetsProvider>
  );
};

export default AssetsListPage;
