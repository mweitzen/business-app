import Link from "next/link";
//
import { api } from "@/lib/api";
import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import CardBase from "@/components/card";

const JobPostingPage = () => {
  const pathname = usePathname();

  const { data: postedPositions, isLoading } =
    api.position.getPostedPositions.useQuery();

  return (
    <div>
      <PageHeader header="Job Postings" />
      <div className="grid gap-4">
        {isLoading ? (
          <div>Loading....</div>
        ) : postedPositions ? (
          postedPositions.map((position) => (
            <Link key={position.id} href={`${pathname}/${position.id}`}>
              <CardBase>
                <div>{position.name}</div>
              </CardBase>
            </Link>
          ))
        ) : (
          <CardBase>
            <p>No positions are posted currently.</p>
          </CardBase>
        )}
      </div>
    </div>
  );
};

export default JobPostingPage;
