import { useMsal } from "@azure/msal-react";
import { LoginRequest, TokenRequest } from "../config/msal";
import useUserRole, { RoleClaimName } from "./useUserRole";
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";

const useAccessToken = () => {
  const { instance, inProgress } = useMsal();
  const accounts = instance.getAllAccounts();
  const [, setUserRole] = useUserRole();

  const tokenPromise = instance
    .acquireTokenSilent({
      ...TokenRequest,
      account: accounts[0] ?? undefined,
    })
    .then((resp) => {
      setUserRole((resp.idTokenClaims as any)[RoleClaimName]);
      return resp.idToken;
    })
    .catch(async (error) => {
      if (error instanceof InteractionRequiredAuthError && inProgress === InteractionStatus.None) {
        await instance.acquireTokenRedirect(LoginRequest);
      }
    });
  return tokenPromise;
};

export default useAccessToken;
