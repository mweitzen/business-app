import prisma from "@/lib/prisma";

export type User = {};

export async function createAsset(user: User) {
  // create user with user data
  const result = await prisma.asset.create({
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

  return result;
}

export async function deleteAsset(id: string) {
  // delete user by id
}

export async function updateAsset(id: string, data: User) {
  // create user with id and new data
  const result = await prisma.asset.update({
    where: {
      id,
    },
    data,
  });

  return result;
}

export async function getAsset(assetId: string) {
  // get user by id
  const result = await prisma.asset.findUnique({
    where: {
      id: assetId,
    },
  });

  return result;
}

export async function getAllAssets() {
  // get all assets
  const result = await prisma.asset.findMany();

  return result;
}
