import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * CREATE NEW ASSET HANDLER
 *
 */
const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json({ error: "error" });
  }

  /*
   * CREATE USER
   */
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
};

export default assets;
