import leaven from "@/constants/leaven.constant";
import dayjs from "dayjs";

export const showTime = (time: any) => {
  // 시간을 비교한다
  const now = dayjs();
  const diff = now.diff(time, "minute");

  if (diff < 1) {
    return "방금 전";
  } else if (diff < 60) {
    return `${diff}분 전`;
  } else if (diff < 1440) {
    return `${Math.floor(diff / 60)}시간 전`;
  } else if (diff < 10080) {
    return `${Math.floor(diff / 1440)}일 전`;
  } else if (diff < 43200) {
    return `${Math.floor(diff / 10080)}주 전`;
  } else if (diff < 525600) {
    return `${Math.floor(diff / 43200)}달 전`;
  } else {
    return `${Math.floor(diff / 525600)}년 전`;
  }
};

export const showBjName = (bj_id: string) => {
  const bjName = leaven.find((creator) => creator.id === bj_id)?.name;

  if (bjName) {
    return bjName;
  }

  return bj_id;
};
