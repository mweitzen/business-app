import Link from "next/link";
import { NextPageWithLayout } from "@/types";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
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
