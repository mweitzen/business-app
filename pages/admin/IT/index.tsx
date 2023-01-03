import { usePathname } from "@/lib/hooks";
//
import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const InformationTechnologyHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="IT Dashboard" />
      <LabelText>Asset Management Section</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4">
        <LinkButton href={`${pathname}/assets/create`}>Create Asset</LinkButton>
        <LinkButton href={`${pathname}/assets`}>Assets List</LinkButton>
        <LinkButton href={`#`}>Service Tickets</LinkButton>
      </div>
      <LabelText>Internet Information</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4">Xfinity</div>
      <LabelText>Telephone Information</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
    </div>
  );
};

export default InformationTechnologyHomePage;
