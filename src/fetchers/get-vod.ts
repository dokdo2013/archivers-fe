import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string, string]): Promise<any> => {
  const result = await axios.get(`/api/vod?stream_id=${args[1]}`);

  return result.data;
};

export const useGetVod = (stream_id: string) => {
  let option = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/vod", stream_id], fetcher, option);

  return result;
};

export const serverGetVod = async (
  host: string,
  stream_id: string,
  isHttps = true
) => {
  const protocol = isHttps ? "https" : "http";

  const result = await fetch(
    `${protocol}://${host}/api/vod?stream_id=${stream_id}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!result) {
    return null;
  }

  return result;
};
