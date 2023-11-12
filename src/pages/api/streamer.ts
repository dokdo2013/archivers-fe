import { getClient } from "@/services/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { streamer_id, streamer_name } = req.query;

  // const {
  //   bj_id,
  //   page,
  //   per_page,
  //   keyword,
  //   sort, // reg_date
  //   sort_type, // asc, desc
  //   start_date,
  //   end_date,
  // } = req.query;

  // validate query
  // if (bj_id !== "all" && typeof bj_id !== "string") {
  //   res.status(400).json({ name: "Invalid bj_id" });
  //   return;
  // }

  let space = req.query.space || 1;
  if (typeof space === "string") {
    space = parseInt(space);
  }

  // query
  const supabase = getClient();

  const query = supabase
    .from("streamer")
    .select("*")
    .eq("space_id", space)
    .order("id", { ascending: false });

  if (streamer_id) {
    query.eq("id", streamer_id);
  } else if (streamer_name) {
    query.eq("twitch_name", streamer_name);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    res.status(400).json({ name: "error occured while querying" });
    return;
  }

  res.status(200).json(data as any);
}
