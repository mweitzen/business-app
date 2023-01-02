import axios from "axios";
import { NextPageWithLayout } from "@/types";
import ButtonBase from "@/components/button";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex gap-x-2 py-2">
        <ButtonBase
          className="w-full"
          onClick={async () => {
            try {
              const { data } = await axios.post(
                "/api/positions/clccgp1tv00309kharj5hxcsm/assign",
                {
                  userId: "clccgp1r1000s9khaisnlv957",
                }
              );
              console.log(data);
              return data;
            } catch (error) {
              console.log("uh oh error");
              console.log(error);
            }
          }}
        >
          Assign Position
        </ButtonBase>
        <ButtonBase
          className="w-full"
          onClick={async () => {
            try {
              const { data } = await axios.post(
                "/api/applicants/clccgp1sd001f9khata18nmiy/hire",
                {
                  positionId: "clccgp1tv002x9khaqbc2ftt3",
                }
              );
              console.log(data);
              return data;
            } catch (error) {
              console.log("uh oh error");
              console.log(error);
            }
          }}
        >
          Hire internal
        </ButtonBase>
        <ButtonBase
          className="w-full"
          onClick={async () => {
            try {
              const { data } = await axios.post(
                "/api/applicants/clccgp1sd001e9khayfeocqpj/hire",
                {
                  positionId: "clccgp1tt00269khaha354vp9",
                }
              );
              console.log(data);
              return data;
            } catch (error) {
              console.log("uh oh error");
              console.log(error);
            }
          }}
        >
          Hire external
        </ButtonBase>
      </div>
    </>
  );
};

export default HomePage;
