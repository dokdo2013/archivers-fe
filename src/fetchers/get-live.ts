import leaven from "@/constants/leaven.constant";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string, string]): Promise<boolean> => {
  let isLive = false;

  const result = await axios
    .get(`https://twapi.haenu.com/user/name/${args[1]}/stream`)
    .then((res) => {
      if (res.data.length > 0) {
        isLive = true;
      }
    })
    .catch((err) => {
      isLive = false;
    });

  return isLive;
};

export const useGetLive = (streamer_name: string) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/live", streamer_name], fetcher, option);

  return result;
};
