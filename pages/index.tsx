import Link from "next/link";
import MainHeader from "@/components/header-main";

const IndexPage = () => {
  return (
    <div>
      <MainHeader header="Your Company" />

      <div className="mb-2 grid gap-6">
        {[
          {
            href: "/admin",
            text: "Company Dashboard (Admin)",
          },
          {
            href: "/personal",
            text: "Personal Dashboard (Internal)",
          },
          {
            href: "/public",
            text: "Public Page",
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
    </div>
  );
};

export default IndexPage;
