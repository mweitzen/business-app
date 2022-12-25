import { type NextApiRequest, type NextApiResponse } from "next";
import { getAsset, deleteAsset, updateAsset } from "@/lib/api/assets";

const assets = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id: assetId },
    method,
    body,
  } = req;

  const allowedMethods = ["PATCH", "GET", "DELETE"];

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ error: "Error" });
  }

  if (method === "GET") {
    const asset = await getAsset(assetId as string);

    return res.status(200).json(asset);
  }
};

export default assets;
