import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Offer } from "../types";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useDeals = () => {
  const [state, setState] = useState<Offer[]>();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await axios.get("/deals");
        setState(response?.data as Offer[]);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useDeals;
