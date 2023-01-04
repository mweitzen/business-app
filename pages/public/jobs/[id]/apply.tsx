import { api } from "@/lib/api";
import { useRouter } from "next/router";
//
import ButtonBase from "@/components/button";
import PageHeader from "@/components/header-page";

const ApplyToPostingPage = () => {
  const {
    query: { id: positionId },
  } = useRouter();

  const mutation = api.position.applyToPosition.useMutation();

  return (
    <div>
      <PageHeader header="Apply to job" />
      <ButtonBase
        onClick={async () =>
          mutation.mutate({
            positionId: positionId as string,
            applicantData: {
              name: "New Applicant",
              email: "new@applicant.com",
            },
          })
        }
      >
        Apply
      </ButtonBase>
    </div>
  );
};

export default ApplyToPostingPage;
