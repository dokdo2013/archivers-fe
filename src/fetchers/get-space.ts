import axios from "axios";
import useSWR from "swr";

const fetcher = async (args: readonly [string, string]): Promise<any> => {
  const result = await axios.get(`/api/space?${args[1]}`);

  return result.data;
};

export const useGetSpace = (space_type = "name", space_value = 1) => {
  let option = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  let query = `${space_type}=${space_value}`;

  const result = useSWR(["/space", query], fetcher, option);

  return result;
};

export const serverGetSpace = async (
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
