import Link from "next/link";
import { NextPageWithLayout } from "@/types";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="py-8 text-center text-9xl">App</div>
      <div className="grid gap-4">
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
            className="mx-8 rounded-xl bg-element py-2 px-8 text-center shadow-md"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
