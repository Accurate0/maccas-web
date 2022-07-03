import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginGuard = () => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    const login = async () => {
      router.replace("/login");
    };

    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      login();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default LoginGuard;
