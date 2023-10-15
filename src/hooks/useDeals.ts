import useApiClient from "./useApiClient/useApiClient";
import { useQuery } from "@tanstack/react-query";

const useDeals = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const response = await apiClient.get_deals();
      return response.result;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useDeals;
