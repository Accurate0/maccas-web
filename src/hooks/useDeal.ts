import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Offer } from "../types";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useDeal = (offerId: string | undefined) => {
  const [deal, setState] = useState<Offer>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await axios.get(`/deals/${offerId}`);
        setState(response?.data as Offer);
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
