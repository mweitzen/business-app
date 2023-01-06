import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import LinkCard from "@/components/card-link";

const EmployeeDashboardPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Employee Dashboard" />

      <div className="grid gap-4">
        <LinkCard href={`${pathname}/apps`} label="Apps" />

        <LinkCard href={`${pathname}/calendars`} label="Calendars" />

        <LinkCard href={`${pathname}/profile`} label="User Profile" />

        {/* <LinkCard href={`${pathname}/`} label="Recent Files / Assigned" />

        <LinkCard href={`${pathname}/`} label="Tasks" />

        <LinkCard href={`${pathname}/`} label="Upcoming Occurrences" />

        <LinkCard href={`${pathname}/`} label="Assets List" /> */}
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;
