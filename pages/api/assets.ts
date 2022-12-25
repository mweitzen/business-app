import { type NextApiRequest, type NextApiResponse } from "next";
import { createAsset, getAllAssets } from "@/lib/api/assets";

const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  const allowedMethods = ["POST", "GET"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({});
  }

  if (method === "POST") {
    // create user
    const data = await createAsset({});
    return res.status(200).json(data);
  }

  if (method === "GET") {
    // get assets
    // implement filter, search, orderBy
    const data = await getAllAssets();
    return res.status(200).json(data);
  }

  res.status(200).json({
    query,
    method,
  });
};

export default assets;
