import Link from "next/link";
//
import { api } from "@/lib/api";
import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import ListBase from "@/components/list";
import CardBase from "@/components/card";

const ApplicantsListPage = () => {
  const pathname = usePathname();

  const { data: applicants, isLoading } = api.applicant.getAll.useQuery();

  return (
    <div>
      <PageHeader header="Current Applicants" />
      <ListBase search={{}} filters={[]}>
        <div className="grid gap-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : applicants ? (
            applicants.map((applicant) => (
              <Link key={applicant.id} href={`${pathname}/${applicant.id}`}>
                <CardBase key={applicant.id}>{applicant.name}</CardBase>
              </Link>
            ))
          ) : (
            <div>No Applicants.</div>
          )}
        </div>
      </ListBase>
    </div>
  );
};

export default ApplicantsListPage;
