import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/page-header";

const JobPostingPage = () => {
  const {} = useQuery({
    queryKey: ["jobPostings"],
    queryFn: async () => {
      const { data } = await axios.get("/api/");
    },
  });
  return (
    <div>
      <PageHeader header="Job Postings" />
      <div></div>
    </div>
  );
};

export default JobPostingPage;
