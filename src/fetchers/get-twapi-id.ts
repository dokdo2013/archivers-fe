import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string, number]): Promise<any> => {
  const result = await axios.get(`https://twapi.haenu.com/user/id/${args[1]}`);

  if (result.data.length === 0) {
    return null;
  }

  return result.data;
};

export const useGetTwapiId = (streamer_id: number) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/twapi/user/id", streamer_id], fetcher, option);

  return result;
};
