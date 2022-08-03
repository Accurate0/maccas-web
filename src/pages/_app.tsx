import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { Container, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import Backdrop from "../components/Backdrop";
import NavBar from "../components/NavBar";
import { MSALInstance } from "../config/msal";
import { theme } from "../styles";
import type { AppProps } from "next/app";
import Login from "./login";
import { useRouter } from "next/router";

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
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </AppSetup>
  );
};

export default App;
