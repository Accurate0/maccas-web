import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { JwtClaim, TokenResponse } from "./useApiClient/ApiClient.generated";
import { useMemo } from "react";

const AUTH_TOKEN_STORAGE_KEY = "maccas-api-auth-token";
const authTokenAtom = atomWithStorage<TokenResponse | null>(
  AUTH_TOKEN_STORAGE_KEY,
  JSON.parse(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? "null")
);

export const useAuthentication = () => {
  const [state, setState] = useAtom(authTokenAtom);
  const decodedJwt = useMemo(() => {
    try {
      return JSON.parse(atob(state?.token.split(".")[1] ?? "")) as JwtClaim;
    } catch {
      return null;
    }
  }, [state?.token]);

  return { state, setState, role: state?.role, claims: decodedJwt };
};

export default useAuthentication;
