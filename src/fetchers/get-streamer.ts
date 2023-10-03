import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string]): Promise<any[]> => {
  const result = await axios.get(`/api/streamer`);

  return result.data;
};

export const useGetStreamer = () => {
  let option = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/streamer"], fetcher, option);

  return result;
};
