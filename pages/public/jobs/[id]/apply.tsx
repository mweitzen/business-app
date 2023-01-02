import ButtonBase from "@/components/button";
import PageHeader from "@/components/header-page";
import axios from "axios";
import { useRouter } from "next/router";

const ApplyToPostingPage = () => {
  const {
    query: { id: positionId },
  } = useRouter();

  return (
    <div>
      <PageHeader header="Apply to job" />
      <ButtonBase
        onClick={async () => {
          await axios.post(`/api/positions/${positionId}/apply`, {
            name: "New Applicant",
            email: "new@applicant.com",
          });
        }}
      >
        Apply
      </ButtonBase>
    </div>
  );
};

export default ApplyToPostingPage;
