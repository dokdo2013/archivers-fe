import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const fetcher = async (args: readonly [string, string]): Promise<any[]> => {
  const result = await axios.get(`/api/vods?${args[1]}`);

  return result.data;
};

const fetcherInfinite = async (args: string): Promise<any[]> => {
  console.log(args);

  const result = await axios.get(`/api${args}`);

  return result.data;
};

// type : all, stream, live
// user_id : all, user_id
// page : 1, 2, 3, ...
// per_page : 60, 120, 180, ...
// keyword : string
// sort : reg_date, view_cnt
// sort_type : asc, desc
// start_date : string
// end_date : string

export interface VideoParams {
  type?: string;
  user_id?: string;
  page?: number;
  per_page?: number;
  keyword?: string;
  sort?: string;
  sort_type?: string;
  start_date?: string;
  end_date?: string;
}

export const useGetVods = ({
  type = "all",
  user_id = "all",
  page = 1,
  per_page = 60,
  keyword = "",
  sort = "reg_date",
  sort_type = "desc",
  start_date = "",
  end_date = "",
}) => {
  const query = `type=${type}&user_id=${user_id}&page=${page}&per_page=${per_page}&keyword=${keyword}&sort=${sort}&sort_type=${sort_type}&start_date=${start_date}&end_date=${end_date}`;

  let option = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  const result = useSWR(["/vods", query], fetcher, option);

  return result;
};

// swr infinite scroll
const getKey = (
  pageIndex: number,
  previousPageData: any,
  perPage: number,
  query: string
) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/vods?page=${pageIndex + 1}&per_page=${perPage}&${query}`; // SWR key
};

export const useGetVodsInfinite = ({
  type = "all",
  user_id = "all",
  per_page = 60,
  keyword = "",
  sort = "reg_date",
  sort_type = "desc",
  start_date = "",
  end_date = "",
}) => {
  const query = `type=${type}&user_id=${user_id}&keyword=${keyword}&sort=${sort}&sort_type=${sort_type}&start_date=${start_date}&end_date=${end_date}`;

  let option = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  const result = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, per_page, query),
    fetcherInfinite,
    option
  );

  return result;
};
