import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";
import { LoginRequest, MSALInstance } from "../config/msal";

const AxiosInstance = axios.create({
  baseURL: "https://api.anurag.sh/maccas/v1",
});

export const fetchAccessToken = async (): Promise<string | undefined> => {
  const accounts = MSALInstance.getAllAccounts();

  try {
    const token = await MSALInstance.acquireTokenSilent({
      ...LoginRequest,
      account: accounts[0] ?? undefined,
    });
    return token.accessToken;
  } catch {
    Router.push("/forceLogin");
  }
};

AxiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const accessToken = await fetchAccessToken();
    config.headers = config.headers ?? {};

    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default AxiosInstance;
