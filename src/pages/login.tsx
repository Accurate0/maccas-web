import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useLayoutEffect } from "react";
import { LoginRequest } from "../config/msal";

const Login: React.FC = () => {
  const { instance } = useMsal();
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useLayoutEffect(() => {
    const login = async () => {
      try {
        await instance.loginRedirect({ ...LoginRequest, redirectUri: "/login" });
      } catch (err) {}
    };

    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Login;
