import usePathname from "@/lib/hooks/usePathname";
//
import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const PublicPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Public Page" />
      <div className="flex flex-col gap-y-4">
        <div>
          <LabelText>Online Job Postings</LabelText>
          <p>
            Publicly accessible job postings, attached to the internal system.
          </p>
        </div>
        <LinkButton href={`${pathname}/jobs`}>View Posted Jobs</LinkButton>
      </div>
    </div>
  );
};

export default PublicPage;
