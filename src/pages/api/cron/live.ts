import leaven from "@/constants/leaven.constant";
import { getClient } from "@/services/database";
import { getClips, getReviews } from "@/services/get-from-afreeca";
import { getBroadcastInfo, getTwitchStreamInfo } from "@/services/live-check";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  for (const creator of leaven) {
    let isLive;

    if (creator.provider === "afreeca") {
      // afreecatv 라이브 여부 체크
      const live = await getBroadcastInfo(creator.id);

      if (live === null) {
        continue;
      }
      isLive = live.onAir;
    } else if (creator.provider === "twitch") {
      // twitch 라이브 여부 체크
      const live = await getTwitchStreamInfo(creator.id);

      if (live === null) {
        continue;
      }
      isLive = live;
    } else {
      continue;
    }

    // 1. DB에서 라이브 정보를 불러온다
    const client = await getClient();

    const { data: foundLive } = await client
      .from("live")
      .select("*")
      .eq("bj_id", creator.id);

    if (foundLive === null) {
      console.error("DB에 라이브 정보가 없습니다" + creator.id);
      continue;
    }

    // 2. DB에 `is_live` 컬럼이 true 또는 false인지 확인한다
    if (foundLive[0].is_live === isLive) {
      // 3. DB에 저장된 값과 라이브 여부가 같다면 아무것도 하지 않는다
      continue;
    } else {
      // 4. DB에 저장된 값과 라이브 여부가 다르다면 DB에 저장한다
      console.log("[Live] DB에 값을 업데이트합니다" + creator.id);
      await client
        .from("live")
        .update({ is_live: isLive, updated_at: new Date() })
        .eq("bj_id", creator.id);
    }
  }

  res.status(200).json({ status: "ok" });
}
