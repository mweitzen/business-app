import prisma from "@/lib/prisma";

export type User = {};

export async function createAsset(user: User) {
  // create user with user data
}

export async function deleteAsset(id: string) {
  // delete user by id
}

export async function updateAsset(id: string, data: User) {
  // create user with id and new data
}

export async function getAsset(id: string) {
  // get user by id
}

export async function getAllAssets() {
  // get all assets
  const data = await prisma.asset.findMany();

  return data;
}
