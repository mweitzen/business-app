import { usePathname } from "@/lib/hooks";
//
import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";
import CardBase from "@/components/card";

const PublicPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Public Page" />
      <div className="grid gap-8">
        <CardBase>
          <div className="flex flex-col gap-y-4">
            <LabelText>Online Job Postings</LabelText>
            <p>
              Publicly accessible job postings, attached to the internal system.
            </p>
            <LinkButton href={`${pathname}/jobs`}>View Posted Jobs</LinkButton>
          </div>
        </CardBase>
        <CardBase>
          <div className="flex flex-col gap-y-4">
            <LabelText>Public Distributed Materials</LabelText>
            <p>
              Any resources: videos or documents, you are sharing publicly
              outside the organization.
            </p>
            <LinkButton href="">View Public Materials</LinkButton>
          </div>
        </CardBase>
      </div>
    </div>
  );
};

export default PublicPage;
