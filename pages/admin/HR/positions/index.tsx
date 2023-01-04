import Link from "next/link";
//
import { api } from "@/lib/api";
import { usePathname } from "@/lib/hooks";
//
import PageHeader from "@/components/header-page";
import ListBase from "@/components/list";

const PositionsListPage = () => {
  const pathname = usePathname();

  const { data: positions, isLoading } = api.position.getAll.useQuery();

  return (
    <div>
      <PageHeader header="Company Positions">
        <Link
          href={`${pathname}/create`}
          className="grid h-8 w-8 place-content-center rounded-full text-xl shadow shadow-purple-300 dark:shadow-gray-800"
        >
          +
        </Link>
      </PageHeader>

      <ListBase search={{}} filters={[]}>
        {isLoading ? (
          <div>Loading...</div>
        ) : positions ? (
          positions.map((position) => (
            <Link key={position.id} href={`${pathname}/${position.id}`}>
              <div className="flex gap-4">
                <p>{position.name}</p>
                <p className="text-xs uppercase">
                  {position.posted ? "Posted" : "Not Posted"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div>Nothing here</div>
        )}
      </ListBase>
    </div>
  );
};

export default PositionsListPage;
