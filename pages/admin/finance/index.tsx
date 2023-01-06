import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import LinkCard from "@/components/card-link";

const FinanceHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Finance Home Page" />

      <div className="grid gap-4">
        <LinkCard href={`${pathname}/services`} label="External Services" />

        <LinkCard href={`${pathname}/expenses`} label="Expenses Management" />

        <LinkCard href={`${pathname}/budget`} label="Budget Management" />

        <LinkCard href={`${pathname}/vendors`} label="Vendors" />
      </div>
    </div>
  );
};

export default FinanceHomePage;
