import Link from "next/link";
import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import CardBase from "@/components/card";
import LabelText from "@/components/text-label";

const ServiceTicketsDashboard = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Service Tickets Dashboard">
        <Link
          href={`${pathname}/create`}
          className="grid h-8 w-8 place-content-center rounded-full text-xl shadow shadow-purple-300 dark:shadow-gray-800"
        >
          +
        </Link>
      </PageHeader>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <CardBase className="text-center">
          <LabelText>New Tickets</LabelText>
          <p className="text-6xl font-semibold">1</p>
        </CardBase>
        <CardBase className="text-center">
          <LabelText>Open Tickets</LabelText>
          <p className="text-6xl font-semibold">7</p>
        </CardBase>
        <CardBase className="text-center">
          <LabelText>In Progress Tickets</LabelText>
          <p className="text-6xl font-semibold">3</p>
        </CardBase>
        <CardBase className="text-center">
          <LabelText>On Hold Tickets</LabelText>
          <p className="text-6xl font-semibold">2</p>
        </CardBase>
      </div>
      <div> </div>
    </div>
  );
};

export default ServiceTicketsDashboard;
