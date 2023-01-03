import { usePathname } from "@/lib/hooks";
//
import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";
import CardBase from "@/components/card";

const FinanceHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Finance Home Page" />

      <div className="space-y-4">
        <CardBase>
          <LabelText>Budget Planning</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Budget Tracking</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Expense Monitoring</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Revenue Stream</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Donors</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Regulations</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Vendors</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>External Services</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>
      </div>
    </div>
  );
};

export default FinanceHomePage;
