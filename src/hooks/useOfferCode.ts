import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetDealsOffer, OfferResponse } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useGetUserConfig } from "./useUserConfig";

const useOfferCode = (offer: GetDealsOffer) => {
  const [code, setResponse] = useState<OfferResponse>();
  const userConfig = useGetUserConfig();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const apiClient = useApiClient();
  const router = useRouter();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.add_deal(offer?.dealUuid, userConfig!.storeId);

        setResponse(response?.result as OfferResponse);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 409) {
          notification({ msg: "This deal is currently unavailable. Try again.", variant: "error" });
          router.push("/");
        } else {
          notification({ msg: (error as AxiosError).message, variant: "error" });
        }
      } finally {
        setBackdrop(false);
      }
    };

    if (offer && userConfig) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer, userConfig]);

  const remove = async () => {
    try {
      setBackdrop(true);
      await apiClient.remove_deal(offer.dealUuid, userConfig!.storeId);
    } catch (error) {
      notification({ msg: (error as AxiosError).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const refreshCode = async () => {
    try {
      setBackdrop(true);
      const response = await apiClient.get_code(offer.dealUuid, userConfig!.storeId);
      setResponse(response.result);
      return response.result;
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
