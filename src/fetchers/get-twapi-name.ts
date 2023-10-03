import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string, number]): Promise<any> => {
  const result = await axios.get(
    `https://twapi.haenu.com/user/name/${args[1]}`
  );

  if (result.data.length === 0) {
    return null;
  }

  return result.data;
};

export const useGetTwapiName = (streamer_name: string) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/twapi/user/name", streamer_name], fetcher, option);

  return result;
};
