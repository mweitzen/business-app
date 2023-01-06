import CardBase from "@/components/card";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const ExternalServicesDashboard = () => {
  return (
    <div>
      <PageHeader header="External Services Dashboard" />
      <div className="space-y-4">
        <CardBase>
          <LabelText>IT services</LabelText>
          <div className="grid gap-2">
            <p>Google Workspace</p>
            <p>Google Cloud Platform</p>
            <p>Microsoft O365</p>
            <p>Microsoft Azure</p>
            <p>Active Directory</p>
          </div>
        </CardBase>
        <CardBase>
          <LabelText>All services (to monitor connections)</LabelText>
          <div className="grid gap-2">
            <p>Google Workspace</p>
            <p>Google Cloud Platform</p>
            <p>Zoom</p>
            <p>Microsoft Teams</p>
            <p>Microsoft O365</p>
            <p>Active Directory</p>
            <p>Salesforce</p>
            <p>Quickbooks</p>
          </div>
        </CardBase>
      </div>
    </div>
  );
};

export default ExternalServicesDashboard;
