import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * CREATE NEW ASSET HANDLER
 *
 */
const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { data: asset },
  } = req;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json({ error: "error" });
  }

  /*
   * CREATE ASSET
   */
  const data = await prisma.asset.create({
    data: {
      ...asset,
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
};

export default assets;
