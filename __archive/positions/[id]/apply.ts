import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * APPLY TO POSITION
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id: positionId },
    body: {
      name,
      email,
      // rest
    },
  } = req;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json("Only post accepted");
  }

  if (typeof positionId !== "string") return;

  /*
   * CREATE APPLICANT AND APPLY TO POSITIONf
   */
  // check if applicant email already exists
  const existingApplicant = await prisma.applicant.findUnique({
    where: {
      email,
    },
    include: {
      interestedIn: true,
    },
  });

  // if existing, add interested positon
  if (existingApplicant) {
    const updatedApplicant = await prisma.applicant.update({
      where: {
        id: existingApplicant.id,
      },
      data: {
        interestedIn: {
          connect: {
            id: positionId,
          },
        },
      },
    });

    return res.status(200).json(updatedApplicant);
  } else {
    // if not, create applicant,
    const newApplicant = await prisma.applicant.create({
      data: {
        name,
        email,
        interestedIn: {
          connect: {
            id: positionId,
          },
        },
      },
    });
    return res.status(200).json(newApplicant);
  }

  return res.status(404).json("This one slipped through the cracks.");
};

export default handler;
