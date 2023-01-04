import { createTRPCRouter } from "./trpc";
//
import { userRouter } from "./routers/user";
import { assetRouter } from "./routers/asset";
import { positionRouter } from "./routers/position";
import { applicantRouter } from "./routers/applicant";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  asset: assetRouter,
  position: positionRouter,
  applicant: applicantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
