import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { OfferPointsResponse } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useGetUserConfig } from "./useUserConfig";

const usePointAccount = (accountId: string) => {
  const [pointInformation, setState] = useState<OfferPointsResponse>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const userConfig = useGetUserConfig();
  const apiClient = useApiClient();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_points_by_id(accountId, userConfig!.storeId);
        setState(response?.result);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
        setError(true);
      } finally {
        setBackdrop(false);
      }
    };

    if (accountId && userConfig) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, userConfig]);

  return { pointInformation, error };
};

export default usePointAccount;
