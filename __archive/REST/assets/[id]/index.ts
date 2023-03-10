import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * ASSET [CRUD] HANDLER
 *
 */
const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id: assetId },
    method,
    body,
  } = req;

  /*
   * REQUEST GUARDS
   */
  const allowedMethods = ["PATCH", "GET", "DELETE"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ error: "Error" });
  }

  /*
   * GET REQUEST
   */
  if (method === "GET") {
    const asset = await prisma.asset.findUnique({
      where: {
        id: assetId as string,
      },
      include: {
        assignedTo: true,
      },
    });

    if (!asset) {
      return res.status(404).json("Asset does not exist");
    }

    return res.status(200).json(asset);
  }
};

export default assets;
