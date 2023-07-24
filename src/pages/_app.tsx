import { AuthenticatedTemplate, MsalProvider, useMsalAuthentication } from "@azure/msal-react";
import { Container, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import React, { ReactNode, useEffect } from "react";
import { RecoilRoot } from "recoil";
import Backdrop from "../components/Backdrop";
import NavBar from "../components/NavBar";
import { LoginRequest, MSALInstance, TokenRequest } from "../config/msal";
import { theme } from "../theme";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import OpenGraph from "../components/OpenGraph";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../index.css";
import UserConfigProvider from "../components/UserConfigProvider";

config.autoAddCss = false;

const Authentication = () => {
  const { login, error } = useMsalAuthentication(InteractionType.Redirect, TokenRequest);

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      login(InteractionType.Redirect, LoginRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
  const router = useRouter();

  return (
    <AppSetup>
      <OpenGraph />
      <AuthenticatedTemplate>
        <UserConfigProvider />
        <NavBar />
        {router.pathname === "/doc" ? (
          <Component {...pageProps} />
        ) : (
          <Container>
            <Component {...pageProps} />
          </Container>
        )}
      </AuthenticatedTemplate>
    </AppSetup>
  );
};

export default App;
