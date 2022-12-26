import { type NextApiRequest, type NextApiResponse } from "next";

import prisma from "@/lib/prisma";

/*
 *
 * ASSIGN ASSET TO USER HANDLER
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  const assetId = query.id as string;
  const { userId } = body;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json({ error: "Error" });
  }

  if (!userId) {
    return res
      .status(400)
      .json(
        "You must provide the user ID to whom you want to assign this asset"
      );
  }

  /*
   * GET ASSET
   */
  const asset = await prisma.asset.findUnique({
    where: {
      id: assetId,
    },
  });

  if (!asset) {
    return res.status(404).json("Asset does not exist");
  }

  if (asset.status !== "available") {
    return res
      .status(404)
      .json(
        "Asset is already assigned to a user. Please use the reassign endpoint to assign to new user."
      );
  }

  /*
   * GET USER
   */
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json("User does not exist");
  }

  /*
   * TRANSACTION | UPDATE ASSET + CREATE ASSET ASSIGNMENT
   */
  const [_, assetAssignment] = await prisma.$transaction([
    prisma.asset.update({
      where: {
        id: assetId,
      },
      data: {
        assignedToId: userId,
        status: "assigned",
      },
    }),
    prisma.assetAssignment.create({
      data: {
        assetId,
        ownerId: userId,
      },
    }),
  ]);

  return res.status(200).json(assetAssignment);
};

export default handler;
