import { getClient } from "@/services/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stream_id } = req.query;

  if (!stream_id) {
    res.status(400).json({ name: "Invalid stream_id" });
    return;
  }

  // query
  const supabase = getClient();

  const query = supabase.from("stream").select("*").eq("stream_id", stream_id);
  const { data, error } = await query;

  if (error) {
    console.log(error);
    res.status(400).json({ name: "error occured while querying" });
    return;
  }

  if (data.length === 0) {
    res.status(200).json(null);
    return;
  }

  res.status(200).json(data[0] as any);
}
