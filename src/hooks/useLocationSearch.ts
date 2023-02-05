import { AxiosError } from "axios";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useLocationSearch = () => {
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const apiClient = useApiClient();

  const search = async (text: string) => {
    try {
      setBackdrop(true);
      const response = await apiClient.search_locations(text);
      return response.result;
    } catch (error) {
      notification({ msg: (error as AxiosError).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  return {
    search,
  };
};

export default useLocationSearch;
