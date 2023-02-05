import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

export type OpenApiObject = any;

const useOpenApi = () => {
  const [state, setState] = useState<OpenApiObject>();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const apiClient = useApiClient();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_openapi();
        setState(JSON.parse(response?.result) as OpenApiObject);
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
