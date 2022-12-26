import prisma from "@/lib/prisma";

export async function createAssetAssignment(assetId: string, userId: string) {
  // assign asset to user based on asset id and user id
  const data = await prisma.assetAssignment.create({
    data: {
      assetId,
      ownerId: userId,
    },
  });

  return data;
}

export async function getAllAssetAssignments() {
  // assign asset to user based on asset id and user id
}
