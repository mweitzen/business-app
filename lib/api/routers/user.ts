import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  /**
   * @summary GET ALL
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  /**
   * @summary GET BY ID
   */
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),

  /**
   * @summary GET USER WITH ASSETS
   */
  getUsersAssets: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        include: {
          assets: true,
          assetHistory: true,
        },
      });
    }),

  /**
   * @summary CREATE NEW USER [NO EMPLOYEE ATTACHMENT]
   */
  createUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email("Please provide a properly formatted email."),
        name: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: input,
      });
    }),
});
