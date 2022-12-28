import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * ASSETS [CRUD] API
 *
 */
const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  /*
   * REQUEST GUARDS
   */
  const allowedMethods = ["POST", "GET"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ error: "Error" });
  }

  /*
   * POST | CREATE ASSET
   */
  if (method === "POST") {
    // create user
    const data = await prisma.asset.create({
      data: {
        name: "",
        type: "LAPTOP",
        brand: "",
        serialNumber: "",
        purchase: {
          create: {
            purchaseDate: new Date(),
            purchasedFrom: "amazon.com",
            purchasePrice: 300,
            orderNumber: "0123-ffsc-3fd",
          },
        },
      },
    });
    return res.status(200).json(data);
  }

  /*
   * GET | RETRIEVE ALL ASSETS
   */
  if (method === "GET") {
    // get assets
    const { filter, search, orderBy } = query;

    if (!!search) {
      const data = await prisma.asset.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              assignedTo: {
                name: {
                  contains: search,
                },
              },
            },
          ],
        },
        include: {
          assignedTo: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      return res.status(200).json(data);
    }
    const data = await prisma.asset.findMany({
      include: {
        assignedTo: true,
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

export default assets;
