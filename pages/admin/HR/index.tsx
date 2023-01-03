import axios from "axios";
//
import PageHeader from "@/components/header-page";
import LinkButton from "@/components/button-link";
import ButtonBase from "@/components/button";
import LabelText from "@/components/text-label";
import { usePathname } from "@/lib/hooks";
import CardBase from "@/components/card";

const HumanResourcesHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="HR Dashboard" />

      <div className="space-y-4">
        <CardBase>
          <LabelText>Employee Lifecycle (Applicant)</LabelText>
          <div className="mb-2 grid gap-6">
            {[
              {
                href: `${pathname}/positions/create`,
                text: "Create Position",
              },
              {
                href: `${pathname}/positions`,
                text: "Positions List",
              },
              {
                href: "/public/jobs",
                text: "Public Posted Positions",
              },
              {
                href: `${pathname}/applicants`,
                text: "Applicant List",
              },
            ].map((link) => (
              <LinkButton key={link.href} href={link.href}>
                {link.text}
              </LinkButton>
            ))}
          </div>
        </CardBase>

        <CardBase>
          <LabelText>Employee Lifecycle (Onboarding)</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Employee Lifecycle (Performance Review)</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Employee Lifecycle (Change of Position)</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Employee Lifecycle (Offboarding)</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Learning | Distributed Materials</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Employee Files | Tax Documents</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>Benefits | Vendors</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>

        <CardBase>
          <LabelText>External System(s)</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4"></div>
        </CardBase>
      </div>
    </div>
  );
};

export default HumanResourcesHomePage;
