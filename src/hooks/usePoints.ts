import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import AxiosInstance from "../lib/AxiosInstance";
import { AccountPointResponse } from "../types/AccountPointResponse";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const usePoints = () => {
  const [points, setState] = useState<AccountPointResponse>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await AxiosInstance.get("/points");
        setState(response.data as AccountPointResponse);
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
        setError(true);
      } finally {
        setBackdrop(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { points, error };
};

export default usePoints;
