import { AuthenticatedTemplate, MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { Container, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import Backdrop from "../components/Backdrop";
import NavBar from "../components/NavBar";
import { LoginRequest, MSALInstance } from "../config/msal";
import { theme } from "../styles";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { InteractionType } from "@azure/msal-browser";
import OpenGraph from "../components/OpenGraph";

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

  return (
    <AppSetup>
      <OpenGraph />
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={LoginRequest} />
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
