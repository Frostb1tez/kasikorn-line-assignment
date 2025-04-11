import { UserAggregateData } from "@/types/auth";
import apiRequest from "@/utils/axios/request";
import { createReactQueryHooks } from "@/utils/react-query";

const { useFetch } = createReactQueryHooks(apiRequest);

export const useGetUserAggregate = () =>
  useFetch<UserAggregateData>("/aggregate/me");
