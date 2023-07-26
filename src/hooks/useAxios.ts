import axios, { InternalAxiosRequestConfig } from "axios";
import { useMemo } from "react";
import useAccessToken from "./useAccessToken";
import axiosRetry from "axios-retry";

const useAxios = () => {
  const tokenPromise = useAccessToken();

  return useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE,
      transformResponse: (data) => data,
    });

    axiosRetry(axiosInstance, {
      retries: 5,
      retryCondition: (error) => {
        if (error.response?.status && error.response.status >= 500) {
          return true;
        }
        return false;
      },
    });

    axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = await tokenPromise;
        config.headers = config.headers ?? {};

        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return axiosInstance;
  }, [tokenPromise]);
};

export default useAxios;
