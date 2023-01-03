import { usePathname } from "@/lib/hooks";
//
import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const PublicPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Public Page" />
      <div className="mb-8 flex flex-col gap-y-4">
        <div>
          <LabelText>Online Job Postings</LabelText>
          <p>
            Publicly accessible job postings, attached to the internal system.
          </p>
        </div>
        <LinkButton href={`${pathname}/jobs`}>View Posted Jobs</LinkButton>
      </div>
      <div className="flex flex-col gap-y-4">
        <div>
          <LabelText>Public Distributed Materials</LabelText>
          <p>
            Any resources: videos or documents, you are sharing publicly outside
            the organization.
          </p>
        </div>
        <LinkButton href={`#`}>View Public Materials</LinkButton>
      </div>
    </div>
  );
};

export default PublicPage;