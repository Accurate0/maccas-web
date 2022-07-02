import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import AxiosInstance from "../lib/AxiosInstance";
import { Offer, OfferResponse } from "../types";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useGetUserConfig } from "./useUserConfig";

const useOfferCode = (offer: Offer | undefined) => {
  const [code, setResponse] = useState<OfferResponse>();
  const userConfig = useGetUserConfig();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await AxiosInstance.post(
          `/deals/${offer?.dealUuid}`,
          null,
          userConfig
            ? {
                params: {
                  store: userConfig.storeId,
                },
              }
            : undefined
        );

        setResponse(response.data as OfferResponse);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    };

    if (offer) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer]);

  const remove = async () => {
    try {
      setBackdrop(true);
      await AxiosInstance.delete(`/deals/${offer?.dealUuid}`);
    } catch (error) {
      notification({ msg: (error as AxiosError).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const refreshCode = async () => {
    try {
      setBackdrop(true);
      const response = await AxiosInstance.get(
        `/code/${offer?.dealUuid}`,
        userConfig
          ? {
              params: {
                store: userConfig.storeId,
              },
            }
          : undefined
      );
      setResponse(response.data);
      return response.data as OfferResponse;
    } catch (error) {
      notification({ msg: (error as AxiosError).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  return {
    code,
    remove,
    refreshCode,
  };
};

export default useOfferCode;
