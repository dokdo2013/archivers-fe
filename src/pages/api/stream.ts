import { getClient } from "@/services/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  // query
  const supabase = getClient();

  const query = supabase
    .from("stream")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: false });
  const { data, error } = await query;

  if (error) {
    console.log(error);
    res.status(400).json({ name: "error occured while querying" });
    return;
  }

  res.status(200).json(data as any);
}
