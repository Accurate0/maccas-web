import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import AxiosInstance from "../lib/AxiosInstance";
import { OfferPointsResponse } from "../types/OfferPointsResponse";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useGetUserConfig } from "./useUserConfig";

const usePointAccount = (accountId: string | undefined) => {
  const [pointInformation, setState] = useState<OfferPointsResponse>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const userConfig = useGetUserConfig();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await AxiosInstance.get(
          `/points/${accountId}`,
          userConfig
            ? {
                params: {
                  store: userConfig.storeId,
                },
              }
            : undefined
        );
        setState(response.data as OfferPointsResponse);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
        setError(true);
      } finally {
        setBackdrop(false);
      }
    };

    if (accountId) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  return { pointInformation, error };
};

export default usePointAccount;
