import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * RE-ASSIGN ASSET TO NEW USER HANDLER
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  const assetId = query.id as string;
  const { userId, condition } = body;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json("This endpoint only accepts POST requests");
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

  if (asset.status !== "assigned") {
    return res
      .status(404)
      .json(
        "Asset is not currently assigned to a user. Please use the assign endpoint to assign asset to a user."
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
   * GET ORIGINAL ASSET ASSIGNMENT
   */
  const originalAssignment = await prisma.assetAssignment.findFirst({
    where: {
      assetId: assetId,
      active: true,
    },
  });

  if (!originalAssignment) {
    return res.status(404).json("Cannot find the original asset assignment");
  }

  /*
   * TRANSACTION | UPDATE ASSET/ASSIGNMENT + CREATE NEW ASSIGNMENT
   */
  const [, , assetAssignment] = await prisma.$transaction([
    // inactivate the old asset assignment and add unassignedAt as today
    prisma.assetAssignment.update({
      where: {
        id: originalAssignment?.id,
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
        assignedToId: userId,
      },
    }),
    // create new asset assignment
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
