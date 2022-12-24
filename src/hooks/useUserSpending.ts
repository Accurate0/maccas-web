import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { GetDealsOffer } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useUserSpending = () => {
  const setBackdrop = useSetBackdrop();
  const apiClient = useApiClient();
  const [amount, setAmount] = useState<number | undefined>();
  const [deals, setDeals] = useState<GetDealsOffer[] | undefined>();
  const notification = useNotification();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_user_spending();
        setAmount(response.result.total);
        setDeals(response.result.items);
      } catch (error) {
        const err = error as AxiosError;
        notification({ msg: err.message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    amount,
    deals,
  };
};

export default useUserSpending;
