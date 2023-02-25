import axios, { InternalAxiosRequestConfig } from "axios";
import { useMemo } from "react";
import useAccessToken from "./useAccessToken";

const useAxios = () => {
  const tokenPromise = useAccessToken();

  return useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE,
      transformResponse: (data) => data,
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
