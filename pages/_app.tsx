import "@/styles/globals.css";
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
import DisplayProvider from "@/context/display";

/*
 *
 * INITIALIZERS
 *
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
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
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <DisplayProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </DisplayProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;

/*
 *
 * tRPC WRAPPER
 *
 */
// export default trpc.withTRPC(App);
