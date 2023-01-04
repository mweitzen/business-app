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

  const postMutation = api.position.postPosition.useMutation();
  const unpostMutation = api.position.unpostPosition.useMutation();

  return (
    <div>
      <PageHeader header={position?.name || ""} />
      {isLoading ? (
        <div>Loading...</div>
      ) : position ? (
        position.posted ? (
          <div className="grid gap-4">
            <LinkButton href={`/public/jobs/${positionId}`}>
              Visit Public Posting
            </LinkButton>
            <ButtonBase
              onClick={() =>
                unpostMutation.mutate({
                  positionId: (positionId as string) || "",
                })
              }
            >
              Take Down Job Posting
            </ButtonBase>
          </div>
        ) : (
          <ButtonBase
            onClick={() =>
              postMutation.mutate({ positionId: (positionId as string) || "" })
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
