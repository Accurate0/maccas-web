import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useApiClient from "../hooks/useApiClient/useApiClient";
import { useLocation } from "react-router";

const Prefetch = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      queryClient.prefetchQuery({
        queryKey: ["points"],
        queryFn: async ({ signal }) => (await apiClient.get_points(signal)).result,
      });
    }
  }, [apiClient, location.pathname, queryClient]);
  return null;
};

export default Prefetch;
