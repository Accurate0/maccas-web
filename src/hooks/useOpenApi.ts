import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

export type OpenApiObject = any;

const useOpenApi = () => {
  const [state, setState] = useState<OpenApiObject>();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await axios.get("/docs/openapi");
        setState(response.data as OpenApiObject);
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

export default useOpenApi;
