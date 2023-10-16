import { useEffect, useState } from "react";
import { AdminUserSpendingMap, ApiException } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useAllUserSpending = () => {
  const setBackdrop = useSetBackdrop();
  const apiClient = useApiClient();
  const [spendingDetails, setSpendingDetails] = useState<AdminUserSpendingMap | undefined>();
  const notification = useNotification();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_all_user_spending();
        setSpendingDetails(response.result);
      } catch (error) {
        const err = error as ApiException;
        notification({ msg: err.message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    spendingDetails,
  };
};

export default useAllUserSpending;
