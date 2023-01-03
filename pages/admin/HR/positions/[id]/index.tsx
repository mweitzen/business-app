import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
//
import ButtonBase from "@/components/button";
import PageHeader from "@/components/header-page";
import LinkButton from "@/components/button-link";

const PositionDetailPage = () => {
  const {
    query: { id: positionId },
  } = useRouter();

  const { data: position, isLoading } = useQuery({
    queryKey: ["position", positionId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/positions/${positionId}`);
      return data;
    },
    retry: false,
  });

  const mutation = useMutation({
    mutationKey: ["position", "posted"],
    mutationFn: async () =>
      await axios.post(`/api/positions/${positionId}/post`),
  });

  return (
    <div>
      <PageHeader header={position.name} />
      {isLoading ? (
        <div>Loading...</div>
      ) : position.posted ? (
        <LinkButton href={`/public/jobs/${positionId}`}>
          Visit Public Posting
        </LinkButton>
      ) : (
        <ButtonBase onClick={() => mutation.mutate()}>
          Post Position For Applicants
        </ButtonBase>
      )}
    </div>
  );
};

export default PositionDetailPage;
