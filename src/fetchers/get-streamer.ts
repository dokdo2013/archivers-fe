import axios from "axios";
import useSWR from "swr";

const fetcher = async (
  args: readonly [string, string, number, number]
): Promise<any> => {
  let query =
    args[1] === "id" ? `streamer_id=${args[2]}` : `streamer_name=${args[2]}`;

  if (args[3]) {
    query += `&space=${args[3]}`;
  }

  const result = await axios.get(`/api/streamer?${query}`);

  if (result.data.length === 0) {
    return null;
  }

  return result.data[0];
};

export const useGetStreamer = (streamer_id: number, space = 1) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(
    ["/streamer", "id", streamer_id, space],
    fetcher,
    option
  );

  return result;
};

export const useGetStreamerByName = (streamer_name: string, space = 1) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const result = useSWR(
    ["/streamer/name", "name", streamer_name, space],
    fetcher,
    option
  );

  return result;
};

export const serverGetStreamer = async (
  host: string,
  streamer_id: number,
  isHttps = true,
  space = 1
) => {
  const protocol = isHttps ? "https" : "http";

  const result = await fetch(
    `${protocol}://${host}/api/streamer?streamer_id=${streamer_id}&space=${space}`,
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

  if (result.length === 0) {
    return null;
  }

  return result[0];
};

export const serverGetStreamerByName = async (
  host: string,
  streamer_name: string,
  isHttps = true,
  space = 1
) => {
  const protocol = isHttps ? "https" : "http";

  const result = await fetch(
    `${protocol}://${host}/api/streamer?streamer_name=${streamer_name}&space=${space}`,
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

  if (result.length === 0) {
    return null;
  }

  return result[0];
};
