import axios from "axios";
import useSWR from "swr";

const fetcher = async (
  args: readonly [string, string, number]
): Promise<any> => {
  const query =
    args[1] === "id" ? `streamer_id=${args[2]}` : `streamer_name=${args[2]}`;

  const result = await axios.get(`/api/streamer?${query}`);

  if (result.data.length === 0) {
    return null;
  }

  return result.data[0];
};

export const useGetStreamer = (streamer_id: number) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/streamer", "id", streamer_id], fetcher, option);

  return result;
};

export const useGetStreamerByName = (streamer_name: string) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(
    ["/streamer/name", "name", streamer_name],
    fetcher,
    option
  );

  return result;
};

export const serverGetStreamer = async (host: string, streamer_id: number) => {
  const result = await axios
    .get(`//${host}/api/streamer?streamer_id=${streamer_id}`)
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!result) {
    return null;
  }

  if (result.data.length === 0) {
    return null;
  }

  return result.data[0];
};

export const serverGetStreamerByName = async (
  host: string,
  streamer_name: string
) => {
  const result = await axios
    .get(`//${host}/api/streamer?streamer_name=${streamer_name}`)
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!result) {
    return null;
  }

  if (result.data.length === 0) {
    return null;
  }

  return result.data[0];
};
