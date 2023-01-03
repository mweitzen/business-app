import Link from "next/link";
import { usePathname } from "@/lib/hooks";
//
import AssetsProvider from "@/context/assets";
import AssetsList from "partials/ListAssets";
import PageHeader from "@/components/header-page";

const AssetsListPage = () => {
  const pathname = usePathname();

  return (
    <AssetsProvider>
      <PageHeader header="Your Company Assets">
        <Link
          href={`${pathname}/create`}
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
