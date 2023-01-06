import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import LinkCard from "@/components/card-link";

const ITDashboard = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="IT Dashboard" />

      <div className="grid gap-4">
        <LinkCard href={`${pathname}/services`} label="External Services" />

        <LinkCard
          href={`${pathname}/assets`}
          label="Asset Management Section"
        />

        <LinkCard href={`${pathname}/tickets`} label="Service Tickets" />

        <LinkCard href={`${pathname}/internet`} label="Internet Provider" />

        <LinkCard href={`${pathname}/telephone`} label="Telephone Provider" />

        <LinkCard href={`${pathname}/vendors`} label="Vendors" />
      </div>
    </div>
  );
};

export default ITDashboard;
