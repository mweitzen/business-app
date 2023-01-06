import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";
import CardBase from "@/components/card";
import LinkCard from "@/components/card-link";

const FacilitiesHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Facilities Home Page" />

      <div className="grid gap-4">
        <LinkCard href={`${pathname}/buildings`} label="Buildings" />

        <LinkCard href={`${pathname}/rooms`} label="Room Management" />

        <LinkCard href={`${pathname}/security`} label="Security Systems" />

        <LinkCard href={`${pathname}/access`} label="Employee Access Control" />

        <LinkCard href={`${pathname}/vendors`} label="Vendors" />
      </div>
    </div>
  );
};

export default FacilitiesHomePage;
