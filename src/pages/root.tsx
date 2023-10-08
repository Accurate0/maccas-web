import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { Container, useMediaQuery } from "@mui/material";
import { theme } from "../theme";
import UserConfigProvider from "../components/UserConfigProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/inter";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { JoyToaster } from "../components/JoyToaster";

const materialTheme = materialExtendTheme(theme);
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
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          {isMobile && <UserConfigProvider />}
          <JoyToaster />
          <Container>
            <Outlet />
          </Container>
        </QueryClientProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default Root;
