import MainHeader from "@/components/header-main";
import LinkButton from "@/components/button-link";
import LabelText from "@/components/text-label";
import CardBase from "@/components/card";

const IndexPage = () => {
  return (
    <div>
      <MainHeader header="Your Company" />

      <div className="mb-2 grid gap-8 text-center text-sm">
        {/*  */}
        {/* ADMIN DASHBOARD */}
        <div className="flex flex-col">
          <CardBase>
            <LabelText>Company Dashboard (Admin)</LabelText>
            <p>
              An administrative overview of the organization. Access is limited
              to those with admin priviliges. Beyond admin privileges,
              additional access to each resource is limited to who gets assigend
              access.
            </p>
          </CardBase>
          <LinkButton href="/admin">Go to Company Dashboard</LinkButton>
        </div>

        {/* EMPLOYEE DASHBOARD */}
        <div className="flex flex-col">
          <CardBase>
            <LabelText>Personal Dashboard (Internal)</LabelText>
            <p>
              Individual experience, tailored to each internal employee's roles
              and needs.
            </p>
          </CardBase>
          <LinkButton href="/personal">Go to Personal Dashboard</LinkButton>
        </div>

        {/* PUBLIC PAGES */}
        <div className="flex flex-col">
          <CardBase>
            <LabelText>Public Page</LabelText>
            <p>Any publicly accessible resources or portals.</p>
          </CardBase>
          <LinkButton href="/public">Go to Public Page</LinkButton>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
