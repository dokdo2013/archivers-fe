import axios from "axios";

/**
 * 아프리카TV 클립 목록을 가져옵니다.
 * @param bj 방송인 아이디
 * @param page 조회할 페이지 번호
 * @param per_page 한 페이지에 표시할 목록 개수
 * @param orderby 정렬 기준 (reg_date, view_cnt, like_cnt, comment_cnt)
 * @param field 검색 기준 (title, contents)
 * @param created 생성일 기준 (true, false)
 * @param catchCreated 생성일 기준 (true, false)
 * @param keyword 검색어
 * @param months 검색 기간 (1, 3, 6, 12)
 * @returns
 */
const getClips = async (
  bj: string,
  page: number = 1,
  per_page: number = 60,
  orderby: string = "reg_date",
  field: string = "title,contents",
  created: boolean = false,
  catchCreated: boolean = true,
  keyword: string = "",
  months: string = ""
) => {
  const res = await axios.get(
    `https://bjapi.afreecatv.com/api/${bj}/vods/clip?page=${page}&per_page=${per_page}&orderby=${orderby}&field=${field}&created=${created}&catchCreated=${catchCreated}&keyword=${keyword}&months=${months}`
  );
  return res.data;
};

/**
 * 아프리카TV 다시보기 목록을 가져옵니다.
 * @param bj 방송인 아이디
 * @param page 조회할 페이지 번호
 * @param per_page 한 페이지에 표시할 목록 개수
 * @param orderby 정렬 기준 (reg_date, view_cnt, like_cnt, comment_cnt)
 * @param field 검색 기준 (title, contents)
 * @param created 생성일 기준 (true, false)
 * @param catchCreated 생성일 기준 (true, false)
 * @param keyword 검색어
 * @param months 검색 기간 (1, 3, 6, 12)
 * @returns
 */
const getReviews = async (
  bj: string,
  page: number = 1,
  per_page: number = 60,
  orderby: string = "reg_date",
  field: string = "title,contents",
  created: boolean = false,
  catchCreated: boolean = true,
  keyword: string = "",
  months: string = ""
) => {
  const res = await axios.get(
    `https://bjapi.afreecatv.com/api/${bj}/vods/review?page=${page}&per_page=${per_page}&orderby=${orderby}&field=${field}&created=${created}&catchCreated=${catchCreated}&keyword=${keyword}&months=${months}`
  );
  return res.data;
};

export { getClips, getReviews };
