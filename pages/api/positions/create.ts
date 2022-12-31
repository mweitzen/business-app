import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/*
 *
 * CREATE NEW POSITION HANDLER
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { data: _position },
  } = req;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json({ error: "error" });
  }

  const { ...position } = _position;
  /*
   * CREATE POSITION
   */
  const data = await prisma.position.create({
    data: {
      ...position,
    },
  });

  return res.status(200).json(data);
};

export default handler;
