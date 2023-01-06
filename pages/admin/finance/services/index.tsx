import CardBase from "@/components/card";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const ExternalServicesDashboard = () => {
  return (
    <div>
      <PageHeader header="External Services Dashboard" />
      <div className="space-y-4">
        <div>
          <LabelText>Salesforce</LabelText>
        </div>
        <div>
          <LabelText>Sage Intaact</LabelText>
        </div>
        <div>
          <LabelText>Quickbooks</LabelText>
        </div>
      </div>
    </div>
  );
};

export default ExternalServicesDashboard;
