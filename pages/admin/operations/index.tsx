import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import LinkCard from "@/components/card-link";

const DailyOperationsHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Daily Operations. Business Logic" />

      <div className="grid gap-4">
        <LinkCard href={`${pathname}/calendars`} label="Calendars" />

        <LinkCard href={`${pathname}/programs`} label="Program Management" />

        <LinkCard
          href={`${pathname}/occurrences`}
          label="Occurrence Management"
        />

        <LinkCard href={`${pathname}/staffing`} label="Employee Staffing" />

        <LinkCard href={`${pathname}/resources`} label="Equipment Management" />

        <LinkCard href={``} label="Task Manager" />

        <LinkCard href={`${pathname}/locations`} label="Location Management" />
      </div>
    </div>
  );
};

export default DailyOperationsHomePage;
