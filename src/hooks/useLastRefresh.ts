import useNotification from "./useNotification";
import { indexQuery } from "../queries/indexQuery";
import { useEffect } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import moment from "moment";

const useLastRefresh = () => {
  const notification = useNotification();
  const { data, networkStatus } = useQuery(indexQuery);

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready) {
      notification({
        msg: `Last refreshed at ${moment.utc(data?.deal.lastRefresh)?.local().format("LLL")}`,
        variant: "info",
      });
    }
  }, [data, networkStatus, notification]);
};

export default useLastRefresh;
