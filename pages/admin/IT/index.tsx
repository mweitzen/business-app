import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const InformationTechnologyHomePage = () => {
  return (
    <div>
      <PageHeader header="IT Dashboard" />
      <LabelText>Asset Assignment</LabelText>
      <div className="mb-2 grid gap-4">
        {[
          {
            href: "/admin/IT/assets/create",
            text: "Create Asset",
          },
          {
            href: "/admin/IT/assets",
            text: "Assets List",
          },
          {
            href: "/admin/employees",
            text: "User List",
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

export default InformationTechnologyHomePage;
