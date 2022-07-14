import { AxiosError } from "axios";
import { RestaurantInformation } from "../types";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useLocationSearch = () => {
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();

  const search = async (text: string) => {
    try {
      setBackdrop(true);
      const response = await axios.get("/locations/search", {
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
