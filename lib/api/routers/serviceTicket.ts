import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const positionRouter = createTRPCRouter({
  /**
   *
   *
   *
   * * CREATE NEW SERVICE TICKET
   *
   *
   *
   */
  createPosition: protectedProcedure
    .input(
      z.object({
        assetId: z.string(),
        summary: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.serviceTicket.create({
        data: {
          assetId: input.assetId,
          summary: input.summary,
        },
      });
    }),
});
