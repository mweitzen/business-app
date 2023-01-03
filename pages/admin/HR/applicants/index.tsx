import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Applicant } from "@prisma/client";
//
import PageHeader from "@/components/header-page";
import ListBase from "@/components/list";
import CardBase from "@/components/card";
import Link from "next/link";
import { usePathname } from "@/lib/hooks";

const ApplicantsListPage = () => {
  const pathname = usePathname();

  const { data: applicants, isLoading } = useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const { data } = await axios.get("/api/applicants");
      return data;
    },
  });

  return (
    <div>
      <PageHeader header="Current Applicants" />
      <ListBase search={{}} filters={[]}>
        {isLoading ? (
          <div>Loading...</div>
        ) : applicants ? (
          applicants.map((applicant: Applicant) => (
            <Link href={`${pathname}/${applicant.id}`}>
              <CardBase key={applicant.id}>{applicant.name}</CardBase>
            </Link>
          ))
        ) : (
          <div>No Applicants.</div>
        )}
      </ListBase>
    </div>
  );
};

export default ApplicantsListPage;
