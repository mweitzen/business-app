import Link from "next/link";
//
import AssetsProvider from "@/context/assets";
import AssetsList from "partials/ListAssets";
import PageHeader from "@/components/header-page";
import { useRouter } from "next/router";

const AssetsListPage = () => {
  const { asPath } = useRouter();

  return (
    <AssetsProvider>
      <PageHeader header="Your Company Assets">
        <Link
          href={`${asPath}/create`}
          className="grid h-8 w-8 place-content-center rounded-full text-xl shadow shadow-purple-300 dark:shadow-gray-800"
        >
          +
        </Link>
      </PageHeader>
      <AssetsList />
    </AssetsProvider>
  );
};

export default AssetsListPage;
