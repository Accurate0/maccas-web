import useApiClient from "./useApiClient/useApiClient";
import { useQuery } from "@tanstack/react-query";

const useDeals = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["deals"],
    queryFn: async ({ signal }) => (await apiClient.get_deals(signal)).result,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (deals) => deals.sort((a, b) => (a.price ?? 10000) - (b.price ?? 10000)),
  });
};

export default useDeals;
