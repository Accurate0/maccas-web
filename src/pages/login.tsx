import { useMsal } from "@azure/msal-react";
import { useLayoutEffect } from "react";
import { LoginRequest } from "../config/msal";

const Login: React.FC = () => {
  const { instance } = useMsal();
  useLayoutEffect(() => {
    const login = async () => {
      try {
        await instance.loginRedirect({ ...LoginRequest, redirectUri: "/" });
      } catch (err) {}
    };

    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Login;
