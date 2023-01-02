import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * POSITION [CRUD] HANDLER
 *
 */
const positions = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id: positionId },
    method,
    body,
  } = req;

  /*
   * REQUEST GUARDS
   */
  const allowedMethods = ["PATCH", "GET", "DELETE"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json("Method not accepted");
  }

  /*
   * GET REQUEST
   */
  if (method === "GET") {
    const position = await prisma.position.findUnique({
      where: {
        id: positionId as string,
      },
      include: {
        department: true,
        employee: true,
        employeeHistory: true,
        interviewHistory: true,
      },
    });

    if (!position) {
      return res.status(404).json("Position does not exist");
    }

    return res.status(200).json(position);
  }
};

export default positions;
