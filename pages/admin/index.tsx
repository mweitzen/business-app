import Link from "next/link";
import CardBase from "@/components/card";
import MainHeader from "@/components/header-main";

const IndexPage = () => {
  return (
    <div>
      <MainHeader header="Your Company Dashboard" />

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3">
        <Link href="#">
          <CardBase>IT</CardBase>
        </Link>
        <Link href="#">
          <CardBase>HR</CardBase>
        </Link>
        <Link href="#">
          <CardBase>Finance</CardBase>
        </Link>
        <Link href="#">
          <CardBase>Facilities</CardBase>
        </Link>
        <Link href="#">
          <CardBase>Daily Operations</CardBase>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
