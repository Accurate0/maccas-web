import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { LoginRequest } from "../config/msal";

const LoginGuard = () => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const login = async () => {
      if (!isAuthenticated && inProgress === InteractionStatus.None) {
        await instance.loginRedirect(LoginRequest);
      }
    };

    login();
  }, [isAuthenticated, inProgress, instance]);

  return <></>;
};

export default LoginGuard;
