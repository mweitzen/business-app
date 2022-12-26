import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  const assetId = query.id as string;

  // POST only
  if (method !== "POST") {
    return res.status(405).json("This endpoint only accepts POST requests");
  }

  // retrieve asset, make sure it exists, and is available
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

  // retrieve the original asset assignment
  const originalAssignment = await prisma.assetAssignment.findFirst({
    where: {
      assetId: assetId,
      active: true,
    },
  });

  if (!originalAssignment) {
    return res.status(404).json("Cannot find the original asset assignment");
  }

  // everything exists and asset is ready to transfer
  const [] = await prisma.$transaction([
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
        assignedToId: null,
        status: "available",
      },
    }),
  ]);

  return res.status(200).json({});
};

export default handler;
