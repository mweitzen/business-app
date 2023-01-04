import { api } from "@/lib/api";
import { useRouter } from "next/router";
//
import ButtonBase from "@/components/button";
import PageHeader from "@/components/header-page";
import LinkButton from "@/components/button-link";

const PositionDetailPage = () => {
  const {
    query: { id: positionId },
  } = useRouter();

  const { data: position, isLoading } = api.position.getById.useQuery({
    positionId: (positionId as string) || "",
  });

  const mutation = api.position.postPosition.useMutation();

  return (
    <div>
      <PageHeader header={position?.name || ""} />
      {isLoading ? (
        <div>Loading...</div>
      ) : position ? (
        position.posted ? (
          <LinkButton href={`/public/jobs/${positionId}`}>
            Visit Public Posting
          </LinkButton>
        ) : (
          <ButtonBase
            onClick={() =>
              mutation.mutate({ positionId: (positionId as string) || "" })
            }
          >
            Post Position For Applicants
          </ButtonBase>
        )
      ) : (
        <div>Doesn't exist????</div>
      )}
    </div>
  );
};

export default PositionDetailPage;
