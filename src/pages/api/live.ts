import { getClient } from "@/services/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { streamer_id } = req.query;

  // // 1. DB에서 라이브 정보를 불러온다
  // const client = await getClient();

  // // if bj_id is all, then not execute eq function
  // let foundLive;
  // if (bj_id === "all") {
  //   const { data } = await client.from("live").select("*").eq("is_live", true);
  //   foundLive = data;

  //   return res.status(200).json({ status: "ok", is_live: foundLive });
  // } else {
  //   const { data } = await client.from("live").select("*").eq("bj_id", bj_id);
  //   foundLive = data;
  // }

  // if (foundLive === null) {
  //   return res.status(404).json({ status: "not found" });
  // }

  // // 2. DB에 `is_live` 컬럼이 true 또는 false인지 확인한다
  // if (foundLive[0].is_live === true) {
  //   return res.status(200).json({ status: "ok", is_live: true });
  // } else {
  //   return res.status(200).json({ status: "ok", is_live: false });
  // }

  return res.status(200).json({ status: "ok", is_live: false });
}
