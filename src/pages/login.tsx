import { useIsAuthenticated } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default Login;
