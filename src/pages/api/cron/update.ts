import leaven from "@/constants/leaven.constant";
import { getClient } from "@/services/database";
import { getClips, getReviews } from "@/services/get-from-afreeca";
import { NextApiRequest, NextApiResponse } from "next";

const getRecentClipsAndReviews = async (bj_id: string) => {
  const clips = await getClips(bj_id, 1, 60);
  const reviews = await getReviews(bj_id, 1, 60);

  return { clips, reviews };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. 다시보기/클립 최근 1페이지 분량의 데이터를 읽어온다
  const clipTotal: any[] = [];
  const reviewTotal: any[] = [];

  for (const creator of leaven) {
    if (creator.provider !== "afreeca") {
      continue;
    }

    const { clips, reviews } = await getRecentClipsAndReviews(creator.id);

    clipTotal.push(...clips.data);
    reviewTotal.push(...reviews.data);
  }

  console.log(clipTotal.length, reviewTotal.length);

  // 2. 데이터베이스에 저장된 데이터와 비교한다
  const client = await getClient();

  const { data: foundClips } = await client
    .from("video")
    .select("*")
    .eq("type", "clip")
    .in(
      "video_id",
      clipTotal.map((clip) => clip.title_no)
    );
  const { data: foundReviews } = await client
    .from("video")
    .select("*")
    .eq("type", "review")
    .in(
      "video_id",
      reviewTotal.map((review) => review.title_no)
    );

  console.log(foundClips?.length, foundReviews?.length);

  // 3. 데이터베이스에 없는 데이터만 저장한다
  const newClips: any[] = [];
  const newReviews: any[] = [];

  for (const clip of clipTotal) {
    const found = foundClips?.find(
      (foundClip) => Number(foundClip.video_id) === Number(clip.title_no)
    );

    if (!found) {
      newClips.push(clip);
    }
  }

  for (const review of reviewTotal) {
    const found = foundReviews?.find(
      (foundReview) => Number(foundReview.video_id) === Number(review.title_no)
    );

    if (!found) {
      newReviews.push(review);
    }
  }

  console.log(newClips.length, newReviews.length);

  const newVideos = newClips
    .map((clip) => {
      return {
        bj_id: clip.badge.bj_id,
        type: "clip",
        link: `https://vod.afreecatv.com/player/${clip.title_no}`,
        title: clip.title_name,
        description: `Made by ${clip.user_id}(${clip.user_nick})`,
        view_count: clip.count.read_cnt,
        uploaded_at: clip.reg_date,
        thumbnail: clip.ucc.thumb,
        data: clip,
        video_id: clip.title_no,
      };
    })
    .concat(
      newReviews.map((review) => {
        return {
          bj_id: review.user_id,
          type: "review",
          link: `https://vod.afreecatv.com/player/${review.title_no}`,
          title: review.title_name,
          description: `Made by ${review.user_id}(${review.user_nick})`,
          view_count: review.count.read_cnt,
          uploaded_at: review.reg_date,
          thumbnail: review.ucc.thumb,
          data: review,
          video_id: review.title_no,
        };
      })
    );

  console.log(newVideos);

  await client.from("video").insert(newVideos);

  res.status(200).json({ status: "ok" });
}
