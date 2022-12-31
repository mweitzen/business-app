import Link from "next/link";
import { NextPageWithLayout } from "@/types";
import ButtonBase from "@/components/button";
import axios from "axios";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <ButtonBase
        onClick={async () => {
          try {
            const { data } = await axios.post(
              "/api/positions/clcble9k3002z9k735bwnn5lj/assign",
              {
                userId: "clcble9g7000s9k73358htsgs",
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
        onClick={async () => {
          try {
            const { data } = await axios.post(
              "/api/applicants/clcble9ii001g9k7371kzsa9d/hire",
              {
                positionId: "clcble9k2002s9k73th8kwdzf",
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
        onClick={async () => {
          try {
            const { data } = await axios.post(
              "/api/applicants/clcble9ij001i9k73ce91l3tw/hire",
              {
                positionId: "clcble9k100299k736e8yx5wl",
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

      <div className="py-8 text-center sm:py-16">
        <h1 className="text-5xl font-thin">Employee Lifecycle</h1>
      </div>
      <div className="mb-2 grid gap-6">
        {[
          {
            href: "/positions/create",
            text: "Create Position",
          },
          {
            href: "/positions",
            text: "Positions List",
          },
          {
            href: "/applicants",
            text: "Applicant List",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-element py-4 px-4 text-center shadow shadow-purple-300 focus:ring-purple-600 active:ring-black dark:shadow-gray-800 md:mx-24"
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className="py-8 text-center sm:py-16">
        <h1 className="text-5xl font-thin">Asset Assignment</h1>
      </div>
      <div className="mb-2 grid gap-6">
        {[
          {
            href: "/assets/create",
            text: "Create Asset",
          },
          {
            href: "/assets",
            text: "Assets List",
          },
          {
            href: "/users",
            text: "User List",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-element py-4 px-4 text-center shadow shadow-purple-300 focus:ring-purple-600 active:ring-black dark:shadow-gray-800 md:mx-24"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
