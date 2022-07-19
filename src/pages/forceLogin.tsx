import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { LoginRequest } from "../config/msal";

const Login: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useLayoutEffect(() => {
    const login = async () => {
      try {
        await instance.loginRedirect({ ...LoginRequest, redirectUri: `${process.env.NEXT_PUBLIC_PUBLIC_URL}/login` });
      } catch (err) {}
    };

    login();
    if (isAuthenticated) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Login;
