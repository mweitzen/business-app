import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  if (method !== "GET") {
    return res.status(405).json("This endpoint only allows GET requests");
  }

  const { id: applicantId } = query;
  //include filter by date range

  const data = await prisma.applicant.findUnique({
    where: {
      id: applicantId as string,
    },
    include: {
      interviews: true,
      // interestedIn: true
    },
  });

  return res.status(200).json(data);
};

export default handler;
