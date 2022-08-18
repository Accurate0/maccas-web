import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AccountPointResponse } from "../types/AccountPointResponse";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const usePoints = () => {
  const [points, setState] = useState<AccountPointResponse>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();
  const router = useRouter();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await axios.get("/points");
        setState(response?.data as AccountPointResponse);
      } catch (exception) {
        const error = exception as AxiosError;
        notification({ msg: error.message, variant: "error" });
        if (error.response?.status === 401) {
          router.push("/");
        }
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
