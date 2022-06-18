import AxiosInstance from "../lib/AxiosInstance";
import { RestaurantInformation } from "../types";
import useSetBackdrop from "./useSetBackdrop";

const DISTANCE = 100;

const useLocations = () => {
  const setBackdrop = useSetBackdrop();

  const search = async (latitude: number, longitude: number) => {
    try {
      setBackdrop(true);
      const result = await AxiosInstance.get("/locations", {
        params: {
          distance: DISTANCE,
          latitude,
          longitude,
        },
      });
      return result.data as RestaurantInformation[];
    } finally {
      setBackdrop(false);
    }
  };

  return {
    search,
  };
};

export default useLocations;
