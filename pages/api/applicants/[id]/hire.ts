import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { positionId },
    query: { id: applicantId },
  } = req;

  // * REQUEST GUARDS
  if (method !== "POST") {
    return res.status(405).json("Only POST requests allowed to this endpoint.");
  }

  if (!applicantId || typeof applicantId !== "string") {
    return res.status(404).json("issue with the id segment of the api request");
  }

  if (!positionId) {
    return res
      .status(404)
      .json("You must supply position ID with the POST request");
  }

  // * HIRE NEW EMPLOYEE
  try {
    const data = await prisma.$transaction(async (tx) => {
      const applicant = await prisma.applicant.findUnique({
        where: {
          id: applicantId,
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
        const oldPosition = await prisma.positionHistory.findFirst({
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
          id: applicantId,
        },
        data: {
          status: "HIRED",
        },
      });

      // assign position to employee and add to position history
      await tx.position.update({
        where: {
          id: positionId,
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

    return res.status(200).json("COMPLETE SUCCESS");
  } catch (error) {
    return res.status(500).json(`Something went wrong: ${error}`);
  }
};

export default handler;
