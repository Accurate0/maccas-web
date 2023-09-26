import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TokenResponse } from "./useApiClient/ApiClient.generated";

const AUTH_TOKEN_STORAGE_KEY = "maccas-api-auth-token";
const authTokenAtom = atomWithStorage<TokenResponse | null>(
  AUTH_TOKEN_STORAGE_KEY,
  JSON.parse(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? "null")
);

export const useAuthentication = () => {
  const [state, setState] = useAtom(authTokenAtom);

  return { state, setState, role: state?.role };
};

export default useAuthentication;
