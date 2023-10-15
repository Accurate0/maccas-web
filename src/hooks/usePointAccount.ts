import { AxiosError } from "axios";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import { useGetUserConfig } from "./useUserConfig";
import { useQuery } from "@tanstack/react-query";

const usePointAccount = (accountId: string) => {
  const notification = useNotification();
  const userConfig = useGetUserConfig();
  const apiClient = useApiClient();

  return useQuery({
    queryKey: [`points-${accountId}`],
    queryFn: async () => {
      try {
        return (await apiClient.get_points_by_id(accountId, userConfig!.storeId)).result;
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      }
    },
  });
};

export default usePointAccount;
