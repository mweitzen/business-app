import Link from "next/link";
import CardBase from "@/components/card";
import MainHeader from "@/components/header-main";

const IndexPage = () => {
  return (
    <div>
      <MainHeader header="Your Company Dashboard" />

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href="/admin/IT">
          <CardBase>IT</CardBase>
        </Link>
        <Link href="/admin/HR">
          <CardBase>HR</CardBase>
        </Link>
        <Link href="/admin/finance">
          <CardBase>Finance</CardBase>
        </Link>
        <Link href="/admin/facilities">
          <CardBase>Facilities</CardBase>
        </Link>
        <Link href="/admin/operations">
          <CardBase>Daily Operations</CardBase>
        </Link>
        <Link href="/admin/employees">
          <CardBase>Employee Management</CardBase>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
