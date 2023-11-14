import { useMemo } from "react";
import { ApiClient } from "./ApiClient.generated";
import useAuthentication from "../useAuthentication";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const useApiClient = () => {
  const { state, setState } = useAuthentication();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const apiClient = useUnauthenticatedApiClient();

  return useMemo(
    () =>
      new ApiClient(import.meta.env.VITE_API_BASE, {
        fetch: async (url, init) => {
          if (state && init) {
            init.headers = {
              ...(init.headers ?? {}),
              Authorization: `Bearer ${state.token}`,
            };
          }

          const response = await fetch(url, init);
          if (response.status === 403 || response.status === 401) {
            await queryClient.cancelQueries();
            try {
              umami?.track("token-expired");
              const { result } = await apiClient.get_token({
                token: state?.token ?? "",
                refreshToken: state?.refreshToken ?? "",
              });
              setState(result);
              await queryClient.refetchQueries();
              umami?.track("token-refreshed");
            } catch {
              umami?.track("token-refresh-failed");

              navigate("/login");
            }
          }
          return response;
        },
      }),
    [apiClient, navigate, queryClient, setState, state]
  );
};

export const useUnauthenticatedApiClient = () =>
  useMemo(() => new ApiClient(import.meta.env.VITE_API_BASE), []);

export default useApiClient;
