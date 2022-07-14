import { AxiosError } from "axios";
import { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { UserOptions } from "../types";
import useAxios from "./useAxios";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const UserConfig = atom<UserOptions | undefined>({
  key: "userConfig",
  default: undefined,
});

export const useGetUserConfig = () => {
  return useRecoilValue(UserConfig);
};

const useUserConfig = () => {
  const [config, setConfig] = useRecoilState(UserConfig);
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const axios = useAxios();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await axios.get("/user/config");
        setConfig(response.data as UserOptions);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status !== 404) {
          notification({ msg: err.message, variant: "error" });
        }
      } finally {
        setBackdrop(false);
      }
    };

    if (!config) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    config,
  };
};

export const useUpdateUserConfig = () => {
  const [, setConfig] = useRecoilState(UserConfig);
  const notification = useNotification();
  const axios = useAxios();

  const updateConfig = async (c: UserOptions) => {
    setConfig(c);
    try {
      await axios.post("/user/config", c);
      notification({ msg: `${c.storeName} selected`, variant: "info" });
    } catch (error) {
      const err = error as AxiosError;
      notification({ msg: err.message, variant: "error" });
    }
  };

  return updateConfig;
};

export default useUserConfig;
