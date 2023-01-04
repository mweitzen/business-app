import { api } from "@/lib/api";
//
import ButtonBase from "@/components/button";
import PageHeader from "@/components/header-page";

const CreatePositionPage = () => {
  const mutation = api.position.createPosition.useMutation();

  return (
    <div>
      <PageHeader header="Create New Position" />

      <p>New Position</p>
      <p>Job Overview for mostly general purposes</p>
      <p>OED</p>
      <p>Assistant to Executive Director</p>
      <ButtonBase
        onClick={() => {
          mutation.mutate({
            name: "New Position",
            overview: "Job Overview for mostly general purposes",
            departmentId: "clce3hz8r002u9k4gqncxru8x",
            supervisingPositionId: "clce3hz8r00389k4gadjhrkj4",
          });
        }}
      >
        Create
      </ButtonBase>
    </div>
  );
};

export default CreatePositionPage;
