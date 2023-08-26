import axios from "axios";

interface UserDataDto {
  userId?: string;
  userNick?: string;
  profileImage?: string;
}

interface BroadcastDataDto {
  broadNo?: number;
  broadTitle?: string;
  broadDatetime?: string;
  currentSumViewer?: number;
}

export interface BroadcastInfo {
  userExist: boolean;
  onAir: boolean;
  userData: UserDataDto;
  broadcastData: BroadcastDataDto;
}

/**
 * @see https://github.com/dokdo2013/afreecatv-discord/blob/f5aaea7071a56e0e16b5a8fcd551e956ca1560c9/src/broadcast/broadcast.service.ts#L204-L260
 */
export const getBroadcastInfo = async (
  userId: string
): Promise<BroadcastInfo> => {
  const endpoint = `https://bjapi.afreecatv.com/api/${userId}/station`;
  const userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36";
  const res = await axios
    .get(endpoint, {
      headers: { "User-Agent": userAgent },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  const data = res;

  // 존재하는 방송국인지 확인 (code 정보가 없어서 추후 예외처리 필요)
  if (data.code == 9000) {
    return {
      userExist: false,
      onAir: false,
      userData: {},
      broadcastData: {},
    };
  }

  // 방송 중인지 확인
  if (data.broad == null) {
    return {
      userExist: true,
      onAir: false,
      userData: {
        userId: data.station.user_id,
        userNick: data.station.user_nick,
        profileImage: data.profile_image,
      },
      broadcastData: {},
    };
  } else {
    return {
      userExist: true,
      onAir: true,
      userData: {
        userId: data.station.user_id,
        userNick: data.station.user_nick,
        profileImage: data.profile_image,
      },
      broadcastData: {
        broadNo: data.broad.broad_no,
        broadTitle: data.broad.broad_title,
        broadDatetime: data.station.broad_start,
        currentSumViewer: data.broad.current_sum_viewer,
      },
    };
  }
};
