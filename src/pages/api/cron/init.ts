// leaven.constant.ts를 순회하면서 각 스트리머별 클립, 영상 정보를 가져온다.
// 이 정보를 DB에 저장한다.
// Rate Limit에 걸리지 않도록 3초에 1번씩 요청한다.

import { getClips, getReviews } from "@/services/get-from-afreeca";
import leaven from "@/constants/leaven.constant";
import { NextApiRequest, NextApiResponse } from "next";
import { Video, addVideo } from "@/services/database";

interface Creator {
  provider: string;
  id: string;
  name?: string;
}

const getEachCreator = async (creator: Creator) => {
  const { provider, id } = creator;

  if (provider !== "afreeca") {
    return;
  }

  const clips = [];
  const reviews = [];

  const firstClips = await getClips(id, 1, 60);
  const firstReviews = await getReviews(id, 1, 60);

  clips.push(...firstClips.data);
  reviews.push(...firstReviews.data);

  const clipTotalCount = firstClips.meta.last_page;
  const reviewTotalCount = firstReviews.meta.last_page;

  for (let i = 2; i <= clipTotalCount; i++) {
    const clip = await getClips(id, i, 60);
    clips.push(...clip.data);
  }

  for (let i = 2; i <= reviewTotalCount; i++) {
    const review = await getReviews(id, i, 60);
    reviews.push(...review.data);
  }

  const creatorData = {
    provider,
    id,
    clips,
    reviews,
  };

  return creatorData;
};

const init = async () => {
  const data = [];

  for (const creator of leaven) {
    const creatorData = await getEachCreator(creator);

    // if (creator.id === "gofl2237") {
    //   continue;
    // }

    console.log(creatorData);
    data.push(creatorData);

    // https://vod.afreecatv.com/player/105382864
    // add to database
    if (creatorData?.clips) {
      const initVideos = [];
      for (const clip of creatorData?.clips) {
        const initVideo = {
          bj_id: creator.id,
          type: "clip",
          link: `https://vod.afreecatv.com/player/${clip.title_no}`,
          title: clip.title_name,
          description: `Made by ${clip.user_id}(${clip.user_nick})`,
          view_count: clip.count.read_cnt,
          uploaded_at: clip.reg_date,
          thumbnail: clip.ucc.thumb,
          data: clip,
        } as Video;

        initVideos.push(initVideo);
      }
      await addVideo(initVideos);
    }

    if (creatorData?.reviews) {
      const initVideos = [];
      for (const review of creatorData?.reviews) {
        const initVideo = {
          bj_id: creator.id,
          type: "review",
          link: `https://vod.afreecatv.com/player/${review.title_no}`,
          title: review.title_name,
          description: `Made by ${review.user_id}(${review.user_nick})`,
          view_count: review.count.read_cnt,
          uploaded_at: review.reg_date,
          thumbnail: review.ucc.thumb,
          data: review,
        } as Video;

        initVideos.push(initVideo);
      }
      await addVideo(initVideos);
    }

    setTimeout(() => {}, 3000);
  }

  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await init();

  res.status(200).json(result);
}
