import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { GetDealsOffer } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";

const useDeals = () => {
  const [state, setState] = useState<GetDealsOffer[]>();
  const notification = useNotification();
  const apiClient = useApiClient();

  useEffect(() => {
    const get = async () => {
      try {
        const response = await apiClient.get_deals();
        setState(response.result);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useDeals;
