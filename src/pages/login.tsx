import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { LoginRequest } from "../config/msal";

const Login: React.FC = () => {
  const { inProgress, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const login = async () => {
      try {
        await instance.loginRedirect({ ...LoginRequest, redirectUri: `${process.env.NEXT_PUBLIC_PUBLIC_URL}/login` });
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
