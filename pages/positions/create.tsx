import ButtonBase from "@/components/button";
import PageHeader from "@/components/header-page";

const CreatePositionPage = () => {
  return (
    <div>
      <PageHeader header="Create New Position" />
      <p>Position Name</p>
      <p>Position Department</p>
      <p>Overview</p>
      <p>Supervising Position</p>
      <p>Subordinate Positions</p>
      <ButtonBase>Create</ButtonBase>
    </div>
  );
};

export default CreatePositionPage;
