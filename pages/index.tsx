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
            href: "/users",
            text: "User List",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-element py-4 px-4 text-center shadow shadow-purple-300 focus:ring-purple-600 active:ring-black md:mx-24"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
