import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  const allowedMethods = ["POST", "GET"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({});
  }

  if (method === "POST") {
    // create user
    // const data = await createUser({});
    // return res.status(200).json(data);
  }

  if (method === "GET") {
    // get users
    const { filter, search, orderBy } = query;

    if (!!search) {
      const data = await prisma.user.findMany({
        where: {
          OR: [
            {
              email: {
                contains: search,
              },
            },
            {
              name: { contains: search },
            },
          ],
        },
      });
      return res.status(200).json(data);
    }
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
  }

  res.status(200).json({
    query,
    method,
  });
};

export default users;
