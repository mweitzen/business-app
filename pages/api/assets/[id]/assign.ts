import { type NextApiRequest, type NextApiResponse } from "next";
//
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  const assetId = query.id as string;
  const { userId } = body;

  // POST only
  if (method !== "POST") {
    return res.status(405).json({ error: "Error" });
  }

  // must provide user id in body
  if (!userId) {
    return res
      .status(400)
      .json(
        "You must provide the user ID to whom you want to assign this asset"
      );
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

  if (asset.status !== "available") {
    return res
      .status(404)
      .json(
        "Asset is already assigned to a user. Please use the reassign endpoint to assign to new user."
      );
  }

  // retrieve the user, make sure they exist
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json("User does not exist");
  }

  // everything exists and asset available, assign asset to user
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
