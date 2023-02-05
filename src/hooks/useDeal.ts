import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { GetDealsOffer } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useDeal = (offerId: string) => {
  const [deal, setState] = useState<GetDealsOffer>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const apiClient = useApiClient();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_deal(offerId);
        setState(response.result);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
        setError(true);
      } finally {
        setBackdrop(false);
      }
    };

    if (offerId) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerId]);

  return { deal, error };
};

export default useDeal;
