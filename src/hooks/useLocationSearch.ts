import { useQueryClient } from "@tanstack/react-query";
import useApiClient from "./useApiClient/useApiClient";
import useSetBackdrop from "./useSetBackdrop";

const useLocationSearch = () => {
  const setBackdrop = useSetBackdrop();
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const search = async (text: string) => {
    try {
      setBackdrop(true);
      const response = await queryClient.fetchQuery({
        queryKey: [`search-${text}`],
        queryFn: async ({ signal }) => await apiClient.search_locations(text, signal),
      });
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
