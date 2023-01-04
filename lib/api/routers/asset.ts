import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const assetRouter = createTRPCRouter({
  /**
   * @summary GET ALL
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.asset.findMany();
  }),

  /**
   * @summary GET BY ID
   */
  getById: publicProcedure
    .input(z.object({ assetId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.asset.findUnique({
        where: {
          id: input.assetId,
        },
      });
    }),

  /**
   * @summary GET BY ID ADMIN
   */
  getByIdAdmin: protectedProcedure
    .input(z.object({ assetId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.asset.findUnique({
        where: {
          id: input.assetId,
        },
        include: {
          assignedTo: true,
          ownerHistory: true,
          purchase: true,
        },
      });
    }),

  /**
   * @summary GET ASSET ASSIGNMENT HISTORY
   */
  getAssetHistory: protectedProcedure
    .input(z.object({ assetId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.assetAssignment.findMany({
        where: {
          assetId: input.assetId,
        },
        include: {
          asset: true,
          owner: true,
        },
        orderBy: {
          assignedAt: "desc",
        },
      });
    }),

  /**
   * @summary CREATE ASSET
   */
  createAsset: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["LAPTOP", "DESKTOP"]),
        brand: z.string(),
        serialNumber: z.string(),
        purchaseDate: z.date().optional(),
        purchasedFrom: z.string(),
        purchasePrice: z.number().gt(0),
        orderNumber: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        return await tx.asset.create({
          data: {
            name: input.name,
            type: input.type,
            brand: input.brand,
            serialNumber: input.serialNumber,
            purchase: {
              create: {
                purchaseDate: input.purchaseDate || new Date(),
                purchasedFrom: input.purchasedFrom,
                purchasePrice: input.purchasePrice,
                orderNumber: input.orderNumber,
              },
            },
          },
        });
      });
    }),

  /**
   * @summary ASSIGN ASSET
   */
});
