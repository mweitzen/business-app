import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * POSITIONS [CRUD] API
 *
 */
const positions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  /*
   * REQUEST GUARDS
   */
  const allowedMethods = ["POST", "GET"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ error: "Error" });
  }

  /*
   * POST | CREATE POSITION
   */
  if (method === "POST") {
    // create position
    const data = await prisma.position.create({
      data: {
        name: "New Position",
        departmentId: "",
      },
    });
    return res.status(200).json(data);
  }

  /*
   * GET | RETRIEVE POSITIONS
   */
  if (method === "GET") {
    const { posted, search, orderBy } = query;

    if (posted === "true") {
      const data = await prisma.position.findMany({
        where: {
          posted: true,
        },
        include: {
          department: true,
        },
      });

      return res.status(200).json(data);
    }

    if (!!search) {
      if (typeof search !== "string") {
        return;
      }

      const data = await prisma.position.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
          ],
        },
        include: {
          department: true,
          employee: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      return res.status(200).json(data);
    }

    const data = await prisma.position.findMany({
      include: {
        department: true,
        employee: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json(data);
  }

  return res.status(200).json({
    query,
    method,
  });
};

export default positions;
