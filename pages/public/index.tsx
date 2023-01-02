import LinkButton from "@/components/button-link";
import MainHeader from "@/components/header-main";

const PublicPage = () => {
  return (
    <div>
      <MainHeader header="Public Page" />
      <LinkButton href="/public/jobs">Public Posted Jobs</LinkButton>
    </div>
  );
};

export default PublicPage;
