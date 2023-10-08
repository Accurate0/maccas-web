import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { Container, useMediaQuery } from "@mui/material";
import { theme } from "../theme";
import UserConfigProvider from "../components/UserConfigProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Root = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { state } = useAuthentication();

  useEffect(() => {
    if (!state) {
      navigate("/login");
    }
  }, [state, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      {isMobile && <UserConfigProvider />}
      <Container>
        <Outlet />
      </Container>
    </QueryClientProvider>
  );
};

export default Root;
