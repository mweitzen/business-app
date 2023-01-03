import PageHeader from "@/components/header-page";
import CardBase from "@/components/card";
import LabelText from "@/components/text-label";

const EmployeeDashboardPage = () => {
  return (
    <div>
      <PageHeader header="Employee Dashboard" />

      <div className="space-y-4">
        <CardBase>
          <LabelText>Apps</LabelText>
        </CardBase>

        <CardBase>
          <LabelText>Tasks</LabelText>
        </CardBase>

        <CardBase>
          <LabelText>Upcoming Occurrences</LabelText>
        </CardBase>
        <CardBase>
          <LabelText>Calendars</LabelText>
        </CardBase>
        <CardBase>
          <LabelText>Recent Files / Assigned</LabelText>
        </CardBase>
        <CardBase>
          <LabelText>User Profile</LabelText>
        </CardBase>
        <CardBase>
          <LabelText>Assets List</LabelText>
        </CardBase>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;
