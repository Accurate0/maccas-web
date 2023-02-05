import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { UserOptions } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";

const UserConfig = atom<UserOptions | undefined>({
  key: "userConfig",
  default: undefined,
});

export const useGetUserConfig = () => {
  return useRecoilValue(UserConfig);
};

const useUserConfig = () => {
  const [config, setConfig] = useRecoilState(UserConfig);
  const notification = useNotification();
  const apiClient = useApiClient();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await apiClient.get_user_config();
        setConfig(response.result);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status !== 404) {
          notification({ msg: err.message, variant: "error" });
        }
      } finally {
        setIsCompleted(true);
      }
    };

    if (!config) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    config,
    isCompleted,
  };
};

export const useUpdateUserConfig = () => {
  const [, setConfig] = useRecoilState(UserConfig);
  const notification = useNotification();
  const apiClient = useApiClient();

  const updateConfig = async (c: UserOptions) => {
    setConfig(c);
    try {
      await apiClient.update_user_config(c);
      notification({ msg: `${c.storeName} selected`, variant: "info" });
    } catch (error) {
      const err = error as AxiosError;
      notification({ msg: err.message, variant: "error" });
    }
  };

  return updateConfig;
};

export default useUserConfig;
