import LoginButton from "@/components/login-btn";
import { NextPageWithLayout } from "@/types";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div>
        Main
        <LoginButton />
      </div>
    </>
  );
};

export default HomePage;
