import Link from "next/link";
import { usePathname } from "@/lib/hooks";
//
import CardBase from "@/components/card";
import PageHeader from "@/components/header-page";

const AdminDashboardPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Your Company Dashboard" />

      {/* link grid */}
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href={`${pathname}/IT`}>
          <CardBase>IT</CardBase>
        </Link>
        <Link href={`${pathname}/HR`}>
          <CardBase>HR</CardBase>
        </Link>
        <Link href={`${pathname}/finance`}>
          <CardBase>Finance</CardBase>
        </Link>
        <Link href={`${pathname}/facilities`}>
          <CardBase>Facilities</CardBase>
        </Link>
        <Link href={`${pathname}/operations`}>
          <CardBase>Daily Operations</CardBase>
        </Link>
        <Link href={`${pathname}/employees`}>
          <CardBase>Employee Management</CardBase>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
