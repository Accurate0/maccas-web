import { AxiosError } from "axios";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import { useQuery } from "@tanstack/react-query";

const useDeals = () => {
  const notification = useNotification();
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      try {
        const response = await apiClient.get_deals();
        return response.result;
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useDeals;
