import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * POST POSITION ONLINE
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id: positionId },
    body: { userId },
  } = req;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json("Only post accepted");
  }
  if (typeof positionId !== "string") return;

  /*
   * POST POSITION
   */
  const data = await prisma.position.update({
    where: {
      id: positionId,
    },
    data: {
      employee: {
        connect: {
          id: userId,
        },
      },
      employeeHistory: {
        create: {
          employeeId: userId,
        },
      },
    },
  });

  return res.status(200).json(data);
};

export default handler;
