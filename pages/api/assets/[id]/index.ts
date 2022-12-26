import { type NextApiRequest, type NextApiResponse } from "next";
import { getAsset, deleteAsset, updateAsset } from "@/lib/api/assets";

/*
 *
 * ASSET [CRUD] HANDLER
 *
 */
const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id: assetId },
    method,
    body,
  } = req;

  /*
   * REQUEST GUARDS
   */
  const allowedMethods = ["PATCH", "GET", "DELETE"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ error: "Error" });
  }

  /*
   * GET REQUEST
   */
  if (method === "GET") {
    const asset = await getAsset(assetId as string);

    if (!asset) {
      return res.status(404).json("Asset does not exist");
    }

    return res.status(200).json(asset);
  }
};

export default assets;
