import Head from "next/head";
import { WithChildren } from "@/types";
//
import { useThemeContext } from "@/context";
import { useEffect } from "react";
import Link from "next/link";

const title = "Asset Assignment";
const description = "Messing this all up";
const logo = "/favicon.ico";
const themeColor = "#7b46f6";
const companyTwitter = "@twitter";
const userTwitter = "@twitter";

const DefaultLayout: React.FC<WithChildren> = ({ children }) => {
  const { mode, toggleMode } = useThemeContext();
  const darkMode = mode === "dark";

  useEffect(() => {
    if (darkMode) {
      document.getElementsByTagName("html")[0].classList.add("dark");
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
    }
  }, [mode]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={logo} />
        <meta name="theme-color" content={themeColor} />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={logo} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={companyTwitter} />
        <meta name="twitter:creator" content={userTwitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logo} />
      </Head>

      <header className="flex w-full justify-between bg-element py-4 px-8 text-main shadow-lg ">
        <Link href="/" className="font-bold">
          Home
        </Link>
        <button onClick={toggleMode} className="font-bold">
          Dark
        </button>
      </header>

      <main className="bg-default py-4 px-8 text-main">{children}</main>
    </>
  );
};

export default DefaultLayout;
