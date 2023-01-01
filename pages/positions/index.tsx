import ListBase from "@/components/list";
import PageHeader from "@/components/page-header";

const PositionsListPage = () => {
  return (
    <div>
      <PageHeader header="Company Positions" />
      <ListBase search={{}} filters={[]}></ListBase>
    </div>
  );
};

export default PositionsListPage;
