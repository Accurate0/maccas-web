import useApiClient from "./useApiClient/useApiClient";
import { useQuery } from "@tanstack/react-query";
import useAuthentication from "./useAuthentication";
import { UserRole } from "./useApiClient/ApiClient.generated";

const usePoints = () => {
  const apiClient = useApiClient();
  const { role } = useAuthentication();
  const enabled = role === UserRole.Admin || role === UserRole.Privileged;

  return useQuery({
    queryKey: ["points"],
    queryFn: async ({ signal }) => (await apiClient.get_points(signal)).result,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default usePoints;
