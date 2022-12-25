import { type NextApiRequest, type NextApiResponse } from "next";
import { createAsset, getAllAssets } from "@/lib/api/assets";

const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ error: "error" });
  }

  //   create user
  const data = await createAsset(body);

  return res.status(200).json(data);
};

export default assets;
