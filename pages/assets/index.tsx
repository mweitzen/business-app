import Link from "next/link";
//
import AssetsProvider from "@/context/assets";
import AssetsList from "partials/ListAssets";

const AssetsListPage = () => {
  return (
    <AssetsProvider>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-3xl font-thin sm:text-4xl">Your Company Assets</h1>
        <Link
          href="/assets/create"
          className="grid h-8 w-8 place-content-center rounded-full text-xl shadow shadow-purple-300"
        >
          +
        </Link>
      </header>

      <AssetsList />
    </AssetsProvider>
  );
};

export default AssetsListPage;
