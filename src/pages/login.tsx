import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default Login;
