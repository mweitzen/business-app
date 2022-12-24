import "@/styles/globals.css";
//
import type { AppType, AppProps } from "next/app";
//
// import { trpc } from "@/lib/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
//
import { NextPageWithLayout } from "@/types";
import DefaultLayout from "@/layouts/default";

const queryClient = new QueryClient();

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
const App = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}) as AppType;

export default App;

/*
 *
 * tRPC WRAPPER
 *
 */
// export default trpc.withTRPC(App);
