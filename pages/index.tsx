import Link from "next/link";
import { NextPageWithLayout } from "@/types";
import axios from "axios";

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
            href: "/assets/assignment-history",
            text: "Assignment History",
          },
          {
            href: "/assets/clc2u9p2500009kj30nftk70m",
            text: "Asset Detail",
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
        <button
          onClick={async () => {
            try {
              const { data } = await axios.post(
                "/api/assets/clc34ych200009kyrkpp8w5c3/unassign"
              );
              console.log(data);

              return data;
            } catch ({ response }) {
              console.log((response as any).data);
            }
          }}
        >
          Test
        </button>
      </div>
    </>
  );
};

export default HomePage;
