import moment from "moment";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import { useQuery } from "@tanstack/react-query";

const useLastRefresh = () => {
  const apiClient = useApiClient();
  const notification = useNotification();

  return useQuery({
    queryKey: ["last-refresh"],
    queryFn: async () => {
      const response = await apiClient.get_last_refresh();
      const lastRefreshed = moment.utc(response.result.lastRefresh);
      notification({
        msg: `Last refreshed at ${lastRefreshed.local().format("LLL")}`,
        variant: "info",
      });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useLastRefresh;
