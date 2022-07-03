import { AxiosError } from "axios";
import AxiosInstance from "../lib/AxiosInstance";
import { RestaurantInformation } from "../types";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useLocationSearch = () => {
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();

  const search = async (text: string) => {
    try {
      setBackdrop(true);
      const response = await AxiosInstance.get("/locations/search", {
        params: {
          text: encodeURIComponent(text),
        },
      });

      return response.data as RestaurantInformation;
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
