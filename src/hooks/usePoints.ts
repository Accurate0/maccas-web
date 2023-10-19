import useApiClient from "./useApiClient/useApiClient";
import { useQuery } from "@tanstack/react-query";

const usePoints = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["points"],
    queryFn: async ({ signal }) => (await apiClient.get_points(signal)).result,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default usePoints;
