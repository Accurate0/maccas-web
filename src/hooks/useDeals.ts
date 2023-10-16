import useApiClient from "./useApiClient/useApiClient";
import { useQuery } from "@tanstack/react-query";

const useDeals = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["deals"],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get_deals(signal);
      return response.result;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useDeals;
