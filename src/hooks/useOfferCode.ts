import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Offer, OfferResponse } from "../types";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useGetUserConfig } from "./useUserConfig";

const useOfferCode = (offer: Offer | undefined) => {
  const [code, setResponse] = useState<OfferResponse>();
  const userConfig = useGetUserConfig();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();
  const router = useRouter();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await axios.post(
          `/deals/${offer?.dealUuid}`,
          undefined,
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

    if (offer) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer]);

  const remove = async () => {
    try {
      setBackdrop(true);
      await axios.delete(`/deals/${offer?.dealUuid}`);
    } catch (error) {
      notification({ msg: (error as AxiosError).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const refreshCode = async () => {
    try {
      setBackdrop(true);
      const response = await axios.get(
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
