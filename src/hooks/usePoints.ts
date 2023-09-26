import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { AccountPointMap } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";
import { useNavigate } from "react-router";

const usePoints = () => {
  const [points, setState] = useState<AccountPointMap[]>();
  const [error, setError] = useState<boolean>(false);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const navigate = useNavigate();
  const apiClient = useApiClient();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_points();
        setState(response?.result);
      } catch (exception) {
        const error = exception as AxiosError;
        notification({ msg: error.message, variant: "error" });
        if (error.response?.status === 401) {
          navigate("/");
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
