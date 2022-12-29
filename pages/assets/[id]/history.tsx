import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssignmentHistoryPage = () => {
  const {
    query: { id: assetId },
  } = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["asset", assetId, "history"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/assets/${assetId}/history`);
      console.log(data);
      return data;
    },
  });
  return <div>Assignment History Page</div>;
};

export default AssignmentHistoryPage;
