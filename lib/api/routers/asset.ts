import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const assetRouter = createTRPCRouter({
  /*
   *
   * GET ALL
   *
   */
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.asset.findMany({ include: { assignedTo: true } });
  }),

  /*
   *
   * GET BY ID
   *
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

  /*
   *
   * GET BY ID ADMIN
   *
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

  /*
   *
   * GET ASSET ASSIGNMENT HISTORY
   *
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

  /*
   *
   * CREATE ASSET
   *
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

  /*
   *
   * ASSIGN ASSET
   *
   */
  assignToUser: protectedProcedure
    .input(
      z.object({
        assetId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // get asset
      const asset = await ctx.prisma.asset.findUnique({
        where: {
          id: input.assetId,
        },
      });

      if (!asset) {
        return "/error";
      }

      if (asset.status !== "AVAILABLE") {
        return "/error";
      }

      // get user
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        return "/error";
      }

      // transaction | UPDATE ASSET + CREATE ASSET ASSIGNMENT
      return ctx.prisma.$transaction([
        ctx.prisma.asset.update({
          where: {
            id: input.assetId,
          },
          data: {
            assignedToId: input.userId,
            status: "ASSIGNED",
          },
        }),
        ctx.prisma.assetAssignment.create({
          data: {
            assetId: input.assetId,
            ownerId: input.userId,
          },
        }),
      ]);
    }),

  /*
   *
   * RE-ASSIGN
   *
   */
  reassignToNewUser: protectedProcedure
    .input(
      z.object({
        assetId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // GET ASSET
      const asset = await ctx.prisma.asset.findUnique({
        where: {
          id: input.assetId,
        },
      });

      if (!asset) {
        return "/erro/Asset does not exist";
      }

      if (asset.status !== "ASSIGNED") {
        return "/error/Asset is not currently assigned to a user. Please use the assign endpoint to assign asset to a user.";
      }

      // GET USER
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        return "/erro/User does not exist";
      }

      // GET ORIGINAL ASSET ASSIGNMENT
      const originalAssignment = await ctx.prisma.assetAssignment.findFirst({
        where: {
          assetId: input.assetId,
          active: true,
        },
      });

      if (!originalAssignment) {
        return "/erro/Cannot find the original asset assignment";
      }

      // transaction | UPDATE ASSET/ASSIGNMENT + CREATE NEW ASSIGNMENT
      return ctx.prisma.$transaction([
        // inactivate the old asset assignment and add unassignedAt as today
        ctx.prisma.assetAssignment.update({
          where: {
            id: originalAssignment?.id,
          },
          data: {
            active: false,
            returnedAt: new Date(),
          },
        }),
        // update asset assignedToId from old user to new user, and change status to "transferring"
        ctx.prisma.asset.update({
          where: {
            id: input.assetId,
          },
          data: {
            assignedToId: input.userId,
          },
        }),
        // create new asset assignment
        ctx.prisma.assetAssignment.create({
          data: {
            assetId: input.assetId,
            ownerId: input.userId,
          },
        }),
      ]);
    }),

  /*
   *
   * UN-ASSIGN
   *
   */
  unassignFromUser: protectedProcedure
    .input(z.object({ assetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // GET ASSET
      const asset = await prisma.asset.findUnique({
        where: {
          id: input.assetId,
        },
      });

      if (!asset) {
        return "/error/Asset does not exist";
      }

      if (asset.status !== "ASSIGNED") {
        return "/error/Asset is not currently assigned to a user.";
      }

      // GET ASSET ASSIGNEMENT
      const assetAssignment = await prisma.assetAssignment.findFirst({
        where: {
          assetId: input.assetId,
          active: true,
        },
      });

      if (!assetAssignment) {
        return "/error/Cannot find the original asset assignment";
      }

      // transaction | UPDATE ASSET ASSIGNMENT + UPDATE ASSET
      return prisma.$transaction([
        // inactivate the old asset assignment and add unassignedAt as today
        prisma.assetAssignment.update({
          where: {
            id: assetAssignment?.id,
          },
          data: {
            active: false,
            returnedAt: new Date(),
          },
        }),

        // update asset assignedToId from old user to new user, and change status to "transferring"
        prisma.asset.update({
          where: {
            id: input.assetId,
          },
          data: {
            assignedToId: null,
            status: "AVAILABLE",
          },
        }),
      ]);
    }),
});
