import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { TokenRequest } from "../config/msal";
import useUserRole, { RoleClaimName } from "./useUserRole";

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
    .catch(() => {
      if (inProgress === InteractionStatus.None) {
        instance.logoutRedirect();
      }
    });

  return tokenPromise;
};

export default useAccessToken;
