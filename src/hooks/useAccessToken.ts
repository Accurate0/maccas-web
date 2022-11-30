import { useMsal } from "@azure/msal-react";
import { TokenRequest } from "../config/msal";

const useAccessToken = () => {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();

  const tokenPromise = instance
    .acquireTokenSilent({
      ...TokenRequest,
      account: accounts[0] ?? undefined,
    })
    .then((token) => token.idToken)
    // ignore error as we should be logged in at this point
    .catch(() => {});

  return tokenPromise;
};

export default useAccessToken;
