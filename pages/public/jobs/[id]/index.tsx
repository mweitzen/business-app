import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
//
import PageHeader from "@/components/header-page";
import LinkButton from "@/components/button-link";
import LabelText from "@/components/text-label";

const JobPostingDetailPage = () => {
  const {
    query: { id: positionId },
  } = useRouter();

  const { data: jobPosting, isLoading } = useQuery({
    queryKey: ["position", positionId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/positions/${positionId}`);
      return data;
    },
  });
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <PageHeader header="Apply to job" />
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
              <p>{jobPosting.description}</p>
            </div>
            <LinkButton href={`/public/jobs/${positionId}/apply`}>
              Apply to Posting
            </LinkButton>
          </div>
        </>
      )}
    </div>
  );
};

export default JobPostingDetailPage;
