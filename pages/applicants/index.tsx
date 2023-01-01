import ListBase from "@/components/list";
import PageHeader from "@/components/page-header";

const ApplicantsListPage = () => {
  return (
    <div>
      <PageHeader header="Current Applicants" />
      <ListBase search={{}} filters={[]}></ListBase>
    </div>
  );
};

export default ApplicantsListPage;
