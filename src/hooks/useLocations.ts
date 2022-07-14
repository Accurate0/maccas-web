import { AxiosError } from "axios";
import { RestaurantInformation } from "../types";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const DISTANCE = 100;

const useLocations = () => {
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();

  const search = async (latitude: number, longitude: number) => {
    try {
      setBackdrop(true);
      const result = await axios.get("/locations", {
        params: {
          distance: DISTANCE,
          latitude,
          longitude,
        },
      });
      return result.data as RestaurantInformation[];
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

export default useLocations;
