import leaven from "@/constants/leaven.constant";
import { getClient } from "@/services/database";
import { getClips, getReviews } from "@/services/get-from-afreeca";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 2. 데이터베이스에 저장된 데이터와 비교한다
  const client = await getClient();

  // find 1000 items for 9 times
  const clipTotal: any[] = [];

  for (let i = 1; i <= 9; i++) {
    const { data } = await client
      .from("video")
      .select("*")
      .is("video_id", null)
      .range(i * 1000 - 1000, i * 1000 - 1);

    if (data !== null && data.length > 0) {
      clipTotal.push(...data);
    }
  }

  // update data (add to video_id column)
  for (const clip of clipTotal) {
    await client
      .from("video")
      .update({ video_id: clip.data.title_no })
      .eq("id", clip.id);
  }

  res.status(200).json({ status: "ok" });
}
