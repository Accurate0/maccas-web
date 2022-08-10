import moment from "moment";
import { useEffect } from "react";
import { LastRefreshInformation } from "../types";
import useAxios from "./useAxios";
import useNotification from "./useNotification";

const useLastRefresh = () => {
  const axios = useAxios();
  const notification = useNotification();
  useEffect(() => {
    const get = async () => {
      try {
        const response = await axios.get("/deals/last-refresh");
        const lastRefreshed = moment.utc((response?.data as LastRefreshInformation).lastRefresh);
        notification({ msg: `Last refreshed at ${lastRefreshed.local().format("LLL")}`, variant: "info" });
      } catch (error) {}
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useLastRefresh;
