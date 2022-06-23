import { UnauthenticatedTemplate, AuthenticatedTemplate, useMsal, MsalProvider } from "@azure/msal-react";
import { Grid, Button, Container, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import Backdrop from "../components/Backdrop";
import NavBar from "../components/NavBar";
import { LoginRequest, MSALInstance } from "../config/msal";
import { theme } from "../styles";

const App = ({ Component, pageProps }: { Component: ReactNode; pageProps: any }) => {
  const { instance } = useMsal();

  const AppSetup = ({ children }: { children: ReactNode }) => (
    <MsalProvider instance={MSALInstance}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <Backdrop />
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </RecoilRoot>
    </MsalProvider>
  );

  return (
    <AppSetup>
      <UnauthenticatedTemplate>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => instance.loginRedirect(LoginRequest)}>
              Login
            </Button>
          </Grid>
        </Grid>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <NavBar />
        <Container>
          <Head>
            <title>Maccas</title>
          </Head>
          <Component {...pageProps} />
        </Container>
      </AuthenticatedTemplate>
    </AppSetup>
  );
};

export default App;
