import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createTRPCContext } from "@/lib/api/trpc";
import { appRouter } from "@/lib/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
