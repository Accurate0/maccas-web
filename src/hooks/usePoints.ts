import { ApiException } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useQuery } from "@tanstack/react-query";

const usePoints = () => {
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["points"],
    queryFn: async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_points();
        return response.result;
      } catch (exception) {
        const error = exception as ApiException;
        notification({ msg: error.message, variant: "error" });
        throw exception;
      } finally {
        setBackdrop(false);
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default usePoints;
