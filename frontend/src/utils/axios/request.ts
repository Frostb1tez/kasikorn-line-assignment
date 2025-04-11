import type {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import axios from "axios";

import { PATH_PAGE } from "../../routes/paths";
import {
  transformKeysToCamelCase,
  transformKeysToSnakeCase,
} from "../dataTransform";
import { getSession, setSession } from "../jwt";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:8000/api/v1/",
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getSession();
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data) {
    config.data = transformKeysToSnakeCase(config.data);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    response.data = transformKeysToCamelCase(response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const isTokenExpired = error.response.status === 401;

    if (
      isTokenExpired &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh-token"
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.get("/auth/refresh-token", {
          withCredentials: true,
        });
        const { accessToken } = response.data;
        setSession(accessToken);
        return await axiosInstance(originalRequest);
      } catch (error) {
        console.error(error);
        setSession();
        window.location.href = PATH_PAGE.home;
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;
