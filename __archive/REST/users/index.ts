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
      if (typeof search !== "string") return;

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

  return res.status(404).json("This one slipped through the cracks");
};

export default users;
