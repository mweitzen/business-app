import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const applicantRouter = createTRPCRouter({
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
    return ctx.prisma.applicant.findMany({
      where: {
        NOT: {
          status: "NON_HIRE",
        },
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
    .input(z.object({ applicantId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.applicant.findUnique({
        where: {
          id: input.applicantId,
        },
        include: {
          interviews: true,
          interestedIn: true,
        },
      });
    }),

  /**
   *
   *
   *
   * * HIRE APPLICANT
   *
   *
   *
   */
  hire: protectedProcedure
    .input(z.object({ applicantId: z.string(), positionId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const applicant = await ctx.prisma.applicant.findUnique({
          where: {
            id: input.applicantId,
          },
        });

        if (!applicant)
          throw new Error("Something went wrong trying to find the applicant");

        let user;

        // check if internal hire
        if (applicant.currentEmployee) {
          // if internal hire, skip creating new user
          // remove the existing position + related info from the internal user
          user = await tx.user.update({
            where: {
              email: applicant.email,
            },
            data: {
              position: undefined,
              manager: undefined,
              directReports: undefined,
              department: undefined,
            },
          });

          // find old position history
          const oldPosition = await ctx.prisma.positionHistory.findFirst({
            where: {
              employeeId: user.id,
              active: true,
            },
          });

          if (!oldPosition) throw new Error("Error finding the old position");

          // inactivate old position
          await tx.positionHistory.update({
            where: {
              id: oldPosition.id,
            },
            data: {
              active: false,
            },
          });
        } else {
          // if not internal hire, create a new user
          const firstName = applicant.name.split(" ")[0];
          const lastName =
            applicant.name.split(" ")[applicant.name.split(" ").length - 1];
          const newEmail =
            firstName.charAt(0).toLowerCase() + lastName.toLowerCase();

          // TODO EVENTUALLY NEEDS REPLACED WITH DOMAIN NAME OF COMPANY

          user = await tx.user.create({
            data: {
              email: `${newEmail}@company.com`,
              personalEmail: applicant.email,
              name: applicant.name,
              firstName,
              lastName,
            },
          });
        }

        if (!user) throw new Error("something went wrong creating the user");

        // set applicant status to hired
        await tx.applicant.update({
          where: {
            id: input.applicantId,
          },
          data: {
            status: "HIRED",
          },
        });

        // assign position to employee and add to position history
        await tx.position.update({
          where: {
            id: input.positionId,
          },
          data: {
            posted: false,
            employee: {
              connect: {
                email: user.email,
              },
            },
            employeeHistory: {
              create: {
                employeeId: user.id,
              },
            },
          },
        });
      });
    }),
});
