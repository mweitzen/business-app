import { api } from "@/lib/api";
import { useRouter } from "next/router";
//
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";

const AssignmentHistoryPage = () => {
  const {
    query: { id: assetId },
  } = useRouter();

  const { data, isLoading } = api.asset.getAssetHistory.useQuery({
    assetId: (assetId as string) || "",
  });

  if (isLoading) return <div>Loading...</div>;

  const currentAssignment = data && data.find((item) => item.active);
  const pastAssignments = data && data.filter((item) => !item.active);

  return (
    <div>
      <PageHeader header="Assignment History Page" />

      <div className="mb-4">
        <LabelText>Current owner</LabelText>
        <div>
          {currentAssignment ? (
            <div>
              <p>{currentAssignment.owner.name}</p>
              <p className="text-sm">
                Since{" "}
                {Intl.DateTimeFormat("en-US").format(
                  new Date(currentAssignment.assignedAt)
                )}
              </p>
            </div>
          ) : (
            "Unassigned"
          )}
        </div>
      </div>
      <LabelText>Past Owners</LabelText>
      {!pastAssignments || pastAssignments.length === 0 ? (
        <div>There have not been any previous owners</div>
      ) : null}
      <>
        {pastAssignments &&
          pastAssignments.map((item) => (
            <div key={item.id} className="border-b p-2">
              <p>{item.owner.name}</p>
              <div className="flex gap-4 text-sm">
                <p>
                  From{" "}
                  {Intl.DateTimeFormat("en-US").format(
                    new Date(item.assignedAt)
                  )}
                </p>
                <p>
                  To{" "}
                  {Intl.DateTimeFormat("en-US").format(
                    new Date(item.returnedAt || "Oops")
                  )}
                </p>
              </div>
            </div>
          ))}
      </>
    </div>
  );
};

export default AssignmentHistoryPage;
