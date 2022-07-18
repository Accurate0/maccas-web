import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { LoginRequest } from "../config/msal";

const Login: React.FC = () => {
  const { instance } = useMsal();
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useLayoutEffect(() => {
    const login = async () => {
      try {
        await instance.loginRedirect({ ...LoginRequest, redirectUri: `${process.env.NEXT_PUBLIC_PUBLIC_URL}/login` });
      } catch (err) {}
    };

    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      login();
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Login;
