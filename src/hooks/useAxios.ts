import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useMemo } from "react";
import axiosRetry from "axios-retry";
import { useAuthentication } from "./useAuthentication";
import { useUnauthenticatedApiClient } from "./useApiClient/useApiClient";
import { useNavigate } from "react-router";

const useAxios = () => {
  const { state, setState } = useAuthentication();
  const apiClient = useUnauthenticatedApiClient();
  const navigate = useNavigate();

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

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
          try {
            const response = await apiClient.get_token({
              token: state?.token ?? "",
              refreshToken: state?.refreshToken ?? "",
            });
            setState(response.result);
          } catch {
            navigate("/login");
          }
        }
        return error;
      }
    );
    return axiosInstance;
  }, [apiClient, navigate, setState, state]);
};

export default useAxios;
