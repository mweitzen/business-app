import Link from "next/link";
//
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Position } from "@prisma/client";
//
import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import CardBase from "@/components/card";

const JobPostingPage = () => {
  const pathname = usePathname();

  const { data: postedPositions, isLoading } = useQuery({
    queryKey: ["jobPostings"],
    queryFn: async () => {
      const { data } = await axios.get("/api/positions?posted=true");
      return data;
    },
  });
  return (
    <div>
      <PageHeader header="Job Postings" />
      <div>
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          postedPositions.map((position: Position) => (
            <Link key={position.id} href={`${pathname}/${position.id}`}>
              <CardBase>
                <div>{position.name}</div>
              </CardBase>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPostingPage;
