import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { useLocation } from "react-router";
import { UserRole } from "../hooks/useApiClient/ApiClient.generated";
import useAuthentication from "../hooks/useAuthentication";

const Prefetch = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();
  const location = useLocation();
  const { role } = useAuthentication();
  const enabled = role === UserRole.Admin || role === UserRole.Privileged;

  useEffect(() => {
    if (
      (location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        queryClient.getQueryState(["points"])?.status !== "success",
      enabled)
    ) {
      queryClient.prefetchQuery({
        queryKey: ["points"],
        queryFn: async ({ signal }) => (await apiClient.get_points(signal)).result,
      });
    }
  }, [apiClient, enabled, location.pathname, queryClient]);
  return null;
};

export default Prefetch;
