import { usePathname } from "@/lib/hooks";
//
import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const FacilitiesHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Facilities Home Page" />
      <LabelText>Buildings</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Room Management</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Security Systems</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Employee Access Control</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Vendors</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
    </div>
  );
};

export default FacilitiesHomePage;
