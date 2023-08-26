import leaven from "@/constants/leaven.constant";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string, string]): Promise<any[]> => {
  const result = await axios.get(`/api/live?bj_id=${args[1]}`);

  return result.data.is_live;
};

export const useGetLive = (bj_id: string) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/live", bj_id], fetcher, option);

  return result;
};
