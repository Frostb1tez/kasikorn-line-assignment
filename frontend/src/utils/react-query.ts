import type { AxiosInstance } from "axios";
import type { QueryFunctionContext, UseQueryOptions } from "react-query";

import { useQuery } from "react-query";

type QueryKey = [string, object | undefined];

export const createReactQueryHooks = (axiosInstance: AxiosInstance) => {
  const fetcher = <T>({
    queryKey,
    pageParam,
  }: QueryFunctionContext<QueryKey>): Promise<T> => {
    const [url, params] = queryKey;
    return axiosInstance
      .get<T>(url, { params: { ...params, pageParam } })
      .then((res) => res.data);
  };

  const useFetch = <T>(
    url: string | null,
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKey>
  ) =>
    useQuery<T, Error, T, QueryKey>(
      [url!, params],
      ({ queryKey, meta }) => fetcher({ queryKey, meta }),
      {
        enabled: !!url,
        ...config,
      }
    );

  return {
    useFetch,
  };
};
