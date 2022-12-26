import { type NextApiRequest, type NextApiResponse } from "next";
import { createAsset } from "@/lib/api/assets";

/*
 *
 * CREATE NEW ASSET HANDLER
 *
 */
const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  /*
   * REQUEST GUARDS
   */
  if (method !== "POST") {
    return res.status(405).json({ error: "error" });
  }

  /*
   * CREATE USER
   */
  const data = await createAsset(body);

  return res.status(200).json(data);
};

export default assets;
