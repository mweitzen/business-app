import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * UN-ASSIGN ASSET FROM USER HANDLER
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  const assetId = query.id as string;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json("This endpoint only accepts POST requests");
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

  if (asset.status !== "assigned") {
    return res.status(404).json("Asset is not currently assigned to a user.");
  }

  /*
   * GET ASSET ASSIGNEMENT
   */
  const assetAssignment = await prisma.assetAssignment.findFirst({
    where: {
      assetId: assetId,
      active: true,
    },
  });

  if (!assetAssignment) {
    return res.status(404).json("Cannot find the original asset assignment");
  }

  /*
   * TRANSACTION | UPDATE ASSET ASSIGNMENT + UPDATE ASSET
   */
  const [] = await prisma.$transaction([
    // inactivate the old asset assignment and add unassignedAt as today
    prisma.assetAssignment.update({
      where: {
        id: assetAssignment?.id,
      },
      data: {
        active: false,
        returnedAt: new Date(),
      },
    }),
    // update asset assignedToId from old user to new user, and change status to "transferring"
    prisma.asset.update({
      where: {
        id: assetId,
      },
      data: {
        assignedToId: null,
        status: "available",
      },
    }),
  ]);

  return res.status(200).json({});
};

export default handler;
