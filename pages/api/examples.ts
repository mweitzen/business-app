import { type NextApiRequest, type NextApiResponse } from "next";

import prisma from "@/lib/prisma";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.user.findMany();
  res.status(200).json(examples);
};

export default examples;
