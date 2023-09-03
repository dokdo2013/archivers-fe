import leaven from "@/constants/leaven.constant";
import { getClient } from "@/services/database";
import { getNotice } from "@/services/get-from-afreeca";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  for (const creator of leaven) {
    let newNotice;

    if (creator.provider === "afreeca") {
      // afreecatv 데이터 조회
      const { data } = await getNotice(
        creator.id,
        creator?.provider_info?.afreeca_notice_board || "",
        1
      );

      if (data === null || data?.length === 0) {
        continue;
      }

      newNotice = data;
    } else {
      continue;
    }

    const client = await getClient();

    // DB에서 공지사항 정보를 불러온다
    const { data: foundNotice } = await client
      .from("notice")
      .select("*")
      .eq("bj_id", creator.id);

    // notice와 foundNotice를 비교한다
    const notices = [] as any[];

    // console.log(newNotice);

    for (const notice of newNotice) {
      const found = foundNotice?.find(
        (item) => Number(item.notice_no) === Number(notice.title_no)
      );

      if (found === undefined) {
        notices.push({
          bj_id: creator.id,
          provider: creator.provider,
          link: `https://bj.afreecatv.com/${creator.id}/post/${notice.title_no}`,
          title: notice.title_name,
          content: notice.content.text_content,
          thumbnail: notice.photos.length > 0 ? notice.photos[0].url : "",
          data: notice,
          notice_at: notice.reg_date,
          notice_no: notice.title_no,
        });
      }
    }

    // 비교해서 foundNotice에 없는 notice만 저장한다
    if (notices.length !== 0) {
      console.log("[Notice] DB에 값을 업데이트합니다" + creator.id);
      await client.from("notice").insert(notices);
    }
  }

  res.status(200).json({ status: "ok" });
}
