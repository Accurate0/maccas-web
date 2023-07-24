import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { TokenRequest } from "../config/msal";

const useAccessToken = () => {
  const { instance, inProgress } = useMsal();
  const accounts = instance.getAllAccounts();

  const tokenPromise = instance
    .acquireTokenSilent({
      ...TokenRequest,
      account: accounts[0] ?? undefined,
    })
    .then((token) => token.idToken)
    .catch(() => {
      if (inProgress === InteractionStatus.None) {
        instance.logoutRedirect();
      }
    });

  return tokenPromise;
};

export default useAccessToken;
