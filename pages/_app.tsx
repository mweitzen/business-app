import "@/styles/globals.css";
import { Inter } from "@next/font/google";
//
import type { AppProps } from "next/app";
//
// import { trpc } from "@/lib/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/context/theme";
//
import { NextPageWithLayout } from "@/types";
import DefaultLayout from "@/layouts/default";

/*
 *
 * INITIALIZERS
 *
 */
const queryClient = new QueryClient();

export const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-family-base",
});

/*
 *
 * APP TYPES (EXTENDED WITH LAYOUT)
 *
 */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/*
 *
 * APP (MAIN)
 *
 */
const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  //
  // const getLayout =
  // Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);
  // return getLayout(

  return (
    <div className={`${inter.variable} font-sans`}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
};

export default App;

/*
 *
 * tRPC WRAPPER
 *
 */
// export default trpc.withTRPC(App);
