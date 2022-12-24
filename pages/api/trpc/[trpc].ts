import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "@/lib/trpc/context";
import { appRouter } from "@/lib/trpc/router/_app";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
  // batching: {
  //   enabled: true,
  // },
});
