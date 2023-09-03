// leaven.constant.ts를 순회하면서 각 스트리머별 클립, 영상 정보를 가져온다.
// 이 정보를 DB에 저장한다.
// Rate Limit에 걸리지 않도록 3초에 1번씩 요청한다.

import { getClips, getNotice, getReviews } from "@/services/get-from-afreeca";
import leaven from "@/constants/leaven.constant";
import { NextApiRequest, NextApiResponse } from "next";
import { Video, addNotice, addVideo } from "@/services/database";

interface Creator {
  provider: string;
  id: string;
  name?: string;
  provider_info?: {
    afreeca_notice_board?: string;
  };
}

const getEachCreator = async (creator: Creator) => {
  const { provider, id } = creator;

  if (provider !== "afreeca") {
    return;
  }

  const notices = [];

  const firstNotices = await getNotice(
    id,
    creator?.provider_info?.afreeca_notice_board || "",
    1
  );

  notices.push(...firstNotices.data);

  const noticeTotalCount = firstNotices.meta.last_page;

  for (let i = 2; i <= noticeTotalCount; i++) {
    const notice = await getNotice(
      id,
      creator?.provider_info?.afreeca_notice_board || "",
      i
    );

    notices.push(...notice.data);
  }

  const creatorData = {
    provider,
    id,
    notices,
  };

  return creatorData;
};

const init = async () => {
  const data = [];

  for (const creator of leaven) {
    const creatorData = await getEachCreator(creator);

    console.log(creatorData);
    data.push(creatorData);

    // add to database
    if (creatorData?.notices) {
      const initNotices = [];
      for (const notice of creatorData?.notices) {
        const initNotice = {
          bj_id: creator.id,
          provider: creator.provider,
          link: `https://bj.afreecatv.com/${creator.id}/post/${notice.title_no}`,
          title: notice.title_name,
          content: notice.content.text_content,
          thumbnail: notice.photos.length > 0 ? notice.photos[0].url : "",
          data: notice,
          notice_at: notice.reg_date,
          notice_no: notice.title_no,
        };

        initNotices.push(initNotice);
      }

      await addNotice(initNotices);
    }

    setTimeout(() => {}, 3000);
  }

  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 나중에 init 필요할 때 주석 처리해서 사용하기
  return;

  const result = await init();

  res.status(200).json(result);
}
