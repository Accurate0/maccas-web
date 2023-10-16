import { ApiException } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const DISTANCE = 100;

const useLocations = () => {
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const apiClient = useApiClient();

  const search = async (latitude: number, longitude: number) => {
    try {
      setBackdrop(true);
      const response = await apiClient.get_locations(DISTANCE, latitude, longitude);
      return response.result;
    } catch (error) {
      notification({ msg: (error as ApiException).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  return {
    search,
  };
};

export default useLocations;
