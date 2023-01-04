import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const positionRouter = createTRPCRouter({
  /**
   *
   *
   *
   * * CREATE NEW POSITION
   *
   *
   *
   */
  createPosition: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        overview: z.string().optional(),
        departmentId: z.string(),
        supervisingPositionId: z.string(),
        posted: z.boolean().default(false),
        salaryRangeLow: z.number().optional(),
        salaryRangeHigh: z.number().optional(),
        // salaryUnit: z.enum([""]).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.position.create({
        data: input,
      });
    }),

  /**
   *
   *
   *
   * * GET ALL
   *
   *
   *
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.position.findMany({
      where: {
        active: true,
      },
      include: {
        department: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }),

  /**
   *
   *
   *
   * * GET BY ID
   *
   *
   *
   */
  getById: publicProcedure
    .input(z.object({ positionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.position.findUnique({
        where: {
          id: input.positionId,
        },
        include: {
          department: true,
        },
      });
    }),

  /**
   *
   *
   *
   * * GET ADMIN VERSION OF POSITION
   *
   *
   *
   */
  getByIdAdmin: protectedProcedure
    .input(z.object({ positionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.position.findUnique({
        where: {
          id: input.positionId,
        },
        include: {
          department: true,
          employee: true,
          employeeHistory: true,
          interviewHistory: true,
        },
      });
    }),

  /**
   *
   *
   *
   * * GET ONLY PUBLIC POSTED POSITIONS
   *
   *
   *
   */
  getPostedPositions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.position.findMany({
      where: {
        posted: true,
      },
    });
  }),

  /**
   *
   *
   *
   * * POST A POSITION PUBLICLY
   *
   *
   *
   */
  postPosition: protectedProcedure
    .input(
      z.object({
        positionId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.position.update({
        where: {
          id: input.positionId,
        },
        data: {
          posted: true,
        },
      });
    }),

  /**
   *
   *
   *
   * * UN POST A POSITION PUBLICLY
   *
   *
   *
   */
  unpostPosition: protectedProcedure
    .input(
      z.object({
        positionId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.position.update({
        where: {
          id: input.positionId,
        },
        data: {
          posted: false,
        },
      });
    }),

  /**
   *
   *
   *
   * * ASSIGN POSITION TO A USER
   *
   *
   *
   */
  assignPositionToUser: protectedProcedure
    .input(z.object({ positionId: z.string(), userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.position.update({
        where: {
          id: input.positionId,
        },
        data: {
          employee: {
            connect: {
              id: input.userId,
            },
          },
          employeeHistory: {
            create: {
              employeeId: input.userId,
            },
          },
        },
      });
    }),

  /**
   *
   *
   *
   * * APPLY TO A POSITION
   *
   *
   *
   */
  applyToPosition: publicProcedure
    .input(
      z.object({
        applicantData: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        positionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check if applicant email already exists
      const existingApplicant = await ctx.prisma.applicant.findUnique({
        where: {
          email: input.applicantData.email,
        },
        include: {
          interestedIn: true,
        },
      });

      // if existing, add interested positon
      if (existingApplicant) {
        return ctx.prisma.applicant.update({
          where: {
            id: existingApplicant.id,
          },
          data: {
            interestedIn: {
              connect: {
                id: input.positionId,
              },
            },
          },
        });
      } else {
        // if not, create applicant,
        return ctx.prisma.applicant.create({
          data: {
            name: input.applicantData.name,
            email: input.applicantData.email,
            interestedIn: {
              connect: {
                id: input.positionId,
              },
            },
          },
        });
      }
    }),
});
