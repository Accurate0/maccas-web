import useApiClient from "./useApiClient/useApiClient";
import useSetBackdrop from "./useSetBackdrop";

const useLocationSearch = () => {
  const setBackdrop = useSetBackdrop();
  const apiClient = useApiClient();

  const search = async (text: string) => {
    try {
      setBackdrop(true);
      const response = await apiClient.search_locations(text);
      return response.result;
    } catch (error) {
      return [];
    } finally {
      setBackdrop(false);
    }
  };

  return {
    search,
  };
};

export default useLocationSearch;
