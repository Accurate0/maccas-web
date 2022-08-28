import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { OfferPointsResponse } from "../types/OfferPointsResponse";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useGetUserConfig } from "./useUserConfig";

const usePointAccount = (accountId: string | undefined) => {
  const [pointInformation, setState] = useState<OfferPointsResponse>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const userConfig = useGetUserConfig();
  const axios = useAxios();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await axios.get(`/points/${accountId}`, {
          params: {
            store: userConfig!.storeId,
          },
        });
        setState(response?.data as OfferPointsResponse);
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
