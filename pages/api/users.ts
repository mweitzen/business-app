import { type NextApiRequest, type NextApiResponse } from "next";
import { createUser, getAllUsers } from "@/lib/api/users";

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  const allowedMethods = ["POST", "GET"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({});
  }

  if (method === "POST") {
    // create user
    const data = await createUser({});
    return res.status(200).json(data);
  }

  if (method === "GET") {
    // get users
    // implement filter, search, orderBy
    const data = await getAllUsers();
    return res.status(200).json(data);
  }

  res.status(200).json({
    query,
    method,
  });
};

export default users;
