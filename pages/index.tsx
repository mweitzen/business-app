import Link from "next/link";
import { NextPageWithLayout } from "@/types";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="py-4 text-center">
        <h1 className="text-5xl font-thin">Asset Assignment</h1>
      </div>
      <div className="grid gap-6 py-6">
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
            href: "/assets/history",
            text: "Assignment History",
          },
          {
            href: "/users",
            text: "User List",
          },
          {
            href: "/users/test",
            text: "User Detail",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-element py-4 px-4 text-center shadow shadow-purple-300 md:mx-24"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
