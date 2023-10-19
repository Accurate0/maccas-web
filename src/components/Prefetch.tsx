import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useApiClient from "../hooks/useApiClient/useApiClient";

const Prefetch = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["points"],
      queryFn: async ({ signal }) => (await apiClient.get_points(signal)).result,
    });
  }, [apiClient, queryClient]);
  return null;
};

export default Prefetch;
