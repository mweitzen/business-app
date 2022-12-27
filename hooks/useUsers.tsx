import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useUsers;
