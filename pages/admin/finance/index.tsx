import { usePathname } from "@/lib/hooks";
//
import LinkButton from "@/components/button-link";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const FinanceHomePage = () => {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader header="Finance Home Page" />
      <LabelText>Budgets</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Expenses</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Non Profit Things ?</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
    </div>
  );
};

export default FinanceHomePage;
