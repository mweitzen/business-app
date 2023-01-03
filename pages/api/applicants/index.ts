import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const applicants = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  const allowedMethods = ["POST", "GET"];

  if (!allowedMethods.includes(method!)) {
    return res
      .status(405)
      .json("Only POST and GET requests accepted at this endpoint.");
  }

  if (method === "POST") {
    // create applicant
    return res.status(404).json("Oops. Not actually set up yet.");
  }

  if (method === "GET") {
    // get applicants
    const { filter, search, orderBy } = query;

    if (!!search) {
      if (typeof search !== "string") return;

      const data = await prisma.applicant.findMany({
        where: {
          NOT: {
            status: "NON_HIRE",
          },
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

    const data = await prisma.applicant.findMany();
    return res.status(200).json(data);
  }

  res.status(404).json("this one slipped through the cracks");
};

export default applicants;
