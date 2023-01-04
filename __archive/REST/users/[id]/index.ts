import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  if (method !== "GET") {
    res.status(405).json("This endpoint only allows GET requests");
  }

  const { id: userId } = query;
  //include filter by date range

  const data = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  return res.status(200).json(data);
};

export default handler;
