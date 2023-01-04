import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";
import CardBase from "@/components/card";

const FacilitiesHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Facilities Home Page" />

      <div className="space-y-4">
        <CardBase>
          <LabelText>Buildings</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Room Management</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Security Systems</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Employee Access Control</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Vendors</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>
      </div>
    </div>
  );
};

export default FacilitiesHomePage;
