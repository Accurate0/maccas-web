import axios, { AxiosRequestConfig } from "axios";
import useAccessToken from "./useAccessToken";

const useAxios = () => {
  const tokenPromise = useAccessToken();
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
  });

  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
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
};

export default useAxios;
