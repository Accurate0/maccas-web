import moment from "moment";
import { useEffect } from "react";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";

const useLastRefresh = () => {
  const apiClient = useApiClient();
  const notification = useNotification();
  useEffect(() => {
    const get = async () => {
      try {
        const response = await apiClient.get_last_refresh();
        const lastRefreshed = moment.utc(response.result.lastRefresh);
        notification({
          msg: `Last refreshed at ${lastRefreshed.local().format("LLL")}`,
          variant: "info",
        });
      } catch (error) {}
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useLastRefresh;
