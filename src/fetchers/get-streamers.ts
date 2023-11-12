import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string, number]): Promise<any[]> => {
  const url =
    args[1] && args[1] !== 1
      ? `/api/streamer?space=${args[1]}`
      : `/api/streamer`;

  const result = await axios.get(url);

  return result.data;
};

export const useGetStreamers = (space = 1) => {
  let option = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/streamer", space], fetcher, option);

  return result;
};
