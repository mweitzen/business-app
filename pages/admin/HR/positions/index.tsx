import Link from "next/link";
//
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Position } from "@prisma/client";
//
import PageHeader from "@/components/header-page";
import ListBase from "@/components/list";

const PositionsListPage = () => {
  const { data: positions, isLoading } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const { data } = await axios.get("/api/positions");
      return data;
    },
  });

  return (
    <div>
      <PageHeader header="Company Positions" />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ListBase search={{}} filters={[]}>
          {positions.map((position: Position) => (
            <Link key={position.id} href={`/admin/HR/positions/${position.id}`}>
              <div className="flex gap-4">
                <p>{position.name}</p>
                <p className="text-xs uppercase">
                  {position.posted ? "Posted" : "Not Posted"}
                </p>
              </div>
            </Link>
          ))}
        </ListBase>
      )}
    </div>
  );
};

export default PositionsListPage;
