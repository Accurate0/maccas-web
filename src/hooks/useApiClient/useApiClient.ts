import { useMemo } from "react";
import useAxios from "../useAxios";
import { ApiClient } from "./ApiClient.generated";

const useApiClient = () => {
  const axios = useAxios();
  return useMemo(() => new ApiClient(import.meta.env.VITE_API_BASE, axios), [axios]);
};

export default useApiClient;
