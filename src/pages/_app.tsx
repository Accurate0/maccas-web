import {
  AuthenticatedTemplate,
  MsalProvider,
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { Container, ThemeProvider, useMediaQuery } from "@mui/material";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import React, { ReactNode, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import Backdrop from "../components/Backdrop";
import NavBar from "../components/NavBar";
import { LoginRequest, MSALInstance, TokenRequest } from "../config/msal";
import { theme } from "../theme";
import type { AppProps } from "next/app";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
  InteractionType,
} from "@azure/msal-browser";
import OpenGraph from "../components/OpenGraph";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../index.css";
import UserConfigProvider from "../components/UserConfigProvider";

config.autoAddCss = false;

const Authentication = () => {
  const [hasPerformedLogin, setHasPerformedLogin] = useState(false);
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    let isCancelled = false;

    const performLogin = async () => {
      if (
        !hasPerformedLogin &&
        !isAuthenticated &&
        inProgress === InteractionStatus.None &&
        !isCancelled
      ) {
        setHasPerformedLogin(true);
        if (!window.parent || window.parent === window) {
          await instance.loginRedirect(LoginRequest);
        } else {
          await instance.loginPopup(LoginRequest);
        }
      }
    };

    performLogin();

    return () => {
      isCancelled = true;
    };
  }, [instance, isAuthenticated, inProgress, hasPerformedLogin]);

  return null;
};

const AppSetup = ({ children }: { children: ReactNode }) => (
  <MsalProvider instance={MSALInstance}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Authentication />
          <Backdrop />
          <Head>
            <title>Maccas</title>
          </Head>
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </RecoilRoot>
  </MsalProvider>
);

const App = ({ Component, pageProps }: AppProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppSetup>
      <OpenGraph />
      <AuthenticatedTemplate>
        {isMobile && <UserConfigProvider />}
        <NavBar />
        <Container>
          <Component {...pageProps} />
        </Container>
      </AuthenticatedTemplate>
    </AppSetup>
  );
};

export default App;
