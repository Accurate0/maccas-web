import { useMemo } from "react";
import useAxios from "../useAxios";
import { ApiClient } from "./ApiClient.generated";
import axios from "axios";

const useApiClient = () => {
  const axios = useAxios();
  return useMemo(() => new ApiClient(import.meta.env.VITE_API_BASE, axios), [axios]);
};

export const useUnauthenticatedApiClient = () =>
  useMemo(
    () =>
      new ApiClient(
        import.meta.env.VITE_API_BASE,
        axios.create({
          baseURL: import.meta.env.VITE_API_BASE,
          transformResponse: (data) => data,
        })
      ),
    []
  );

export default useApiClient;
