import { AxiosError } from "axios";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { UserOptions } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import { useLocation } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UserConfig = atom<UserOptions | undefined>({
  key: "userConfig",
  default: undefined,
});

export const useGetUserConfig = () => {
  return useRecoilValue(UserConfig);
};

const useUserConfig = () => {
  const location = useLocation();
  const apiClient = useApiClient();
  const [, setConfig] = useRecoilState(UserConfig);

  return useQuery({
    queryKey: ["user-config"],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get_user_config(signal);
      setConfig(response.result);
      return response.result;
    },
    enabled: location.pathname !== "/login",
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserConfig = () => {
  const queryClient = useQueryClient();
  const [, setConfig] = useRecoilState(UserConfig);
  const notification = useNotification();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async (c: UserOptions) => {
      setConfig(c);
      try {
        await apiClient.update_user_config(c);
      } catch (error) {
        const err = error as AxiosError;
        notification({ msg: err.message, variant: "error" });
        throw err;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user-config"] }),
  });
};

export default useUserConfig;
