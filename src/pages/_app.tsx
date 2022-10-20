import {
  AuthenticatedTemplate,
  MsalAuthenticationTemplate,
  MsalProvider,
  useMsalAuthentication,
} from "@azure/msal-react";
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
import { InteractionType } from "@azure/msal-browser";
import OpenGraph from "../components/OpenGraph";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../index.css";

config.autoAddCss = false;

const AppSetup = ({ children }: { children: ReactNode }) => (
  <MsalProvider instance={MSALInstance}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
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
  const { login, error } = useMsalAuthentication(InteractionType.Silent, TokenRequest);

  useEffect(() => {
    if (error) {
      login(InteractionType.Redirect, LoginRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <AppSetup>
      <OpenGraph />
      <AuthenticatedTemplate>
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
