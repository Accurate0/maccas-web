import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import AxiosInstance from "../lib/AxiosInstance";
import { Offer } from "../types";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useDeal = (offerId: string | undefined) => {
  const [state, setState] = useState<Offer>();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await AxiosInstance.get(`/deal/${offerId}`);
        setState(response.data as Offer);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    };

    if (offerId) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerId]);

  return state;
};

export default useDeal;
