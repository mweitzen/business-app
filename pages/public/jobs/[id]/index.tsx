import { api } from "@/lib/api";
//
import { useRouter } from "next/router";
import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import LinkButton from "@/components/button-link";
import LabelText from "@/components/text-label";

const JobPostingDetailPage = () => {
  const {
    query: { id: positionId },
  } = useRouter();

  const pathname = usePathname();

  const { data: jobPosting, isLoading } = api.position.getById.useQuery({
    positionId: (positionId as string) || "",
  });

  return (
    <div>
      <PageHeader header="Apply to job" />
      {isLoading ? (
        <div>Loading...</div>
      ) : jobPosting ? (
        <div className="space-y-4">
          <div>
            <LabelText>Position Name</LabelText>
            <h2>{jobPosting.name}</h2>
          </div>
          <div>
            <LabelText>Department</LabelText>
            <p>{jobPosting.department.name}</p>
          </div>
          <div>
            <LabelText>Salary Range ?</LabelText>
            <p>$35,000 - $150,000</p>
          </div>
          <div>
            <LabelText>Position Type ?</LabelText>
            <p>{jobPosting.laborStatus}</p>
          </div>
          <div>
            <p>{jobPosting.overview}</p>
          </div>
          <LinkButton href={`${pathname}/apply`}>Apply to Posting</LinkButton>
        </div>
      ) : (
        <div>Oops.</div>
      )}
    </div>
  );
};

export default JobPostingDetailPage;
