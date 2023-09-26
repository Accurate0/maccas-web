import axios, { InternalAxiosRequestConfig } from "axios";
import { useMemo } from "react";
import axiosRetry from "axios-retry";
import { useAuthentication } from "./useAuthentication";

const useAxios = () => {
  const { state } = useAuthentication();

  return useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE,
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
        config.headers = config.headers ?? {};

        if (state) {
          config.headers["Authorization"] = `Bearer ${state.token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return axiosInstance;
  }, [state]);
};

export default useAxios;
