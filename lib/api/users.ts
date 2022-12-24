import prisma from "@/lib/prisma";
import { ApiQueryOptions } from "@/types";

export type User = {};

export async function createUser(user: User) {
  // create user with user data
  const data = await prisma.user.create({
    data: {},
  });

  return data;
}

export async function deleteUser(id: string) {
  // delete user by id
}

export async function updateUser(id: string, data: User) {
  // create user with id and new data
}

export async function getUser(id: string) {
  // get user by id
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return result;
}

export async function getAllUsers(options?: ApiQueryOptions) {
  if (options) {
  }

  const data = await prisma.user.findMany();

  return data;
}
