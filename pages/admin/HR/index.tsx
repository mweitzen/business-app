import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const HumanResourcesHomePage = () => {
  return (
    <div>
      <PageHeader header="HR Dashboard" />
      <LabelText>Employee Lifecycle (Applicant)</LabelText>
      <div className="mb-2 grid gap-6">
        {[
          {
            href: "/admin/HR/positions/create",
            text: "Create Position",
          },
          {
            href: "/admin/HR/positions",
            text: "Positions List",
          },
          {
            href: "/public/jobs",
            text: "Public Posted Positions",
          },
          {
            href: "/admin/HR/applicants",
            text: "Applicant List",
          },
        ].map((link) => (
          <LinkButton key={link.href} href={link.href}>
            {link.text}
          </LinkButton>
        ))}
      </div>
    </div>
  );
};

export default HumanResourcesHomePage;
