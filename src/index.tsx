import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MSALInstance } from "./config/msal";
import { MsalProvider } from "@azure/msal-react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles";
import { RecoilRoot } from "recoil";
import Backdrop from "./components/Backdrop";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <>
          <div role="alert">
            <div>Oh no</div>
            <pre>{error.message}</pre>
            <pre>{JSON.stringify(error)}</pre>
            <button
              onClick={() => {
                resetErrorBoundary();
              }}
            >
              Try again
            </button>
          </div>
        </>
      )}
    >
      <MsalProvider instance={MSALInstance}>
        <RecoilRoot>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <Backdrop />
                <App />
              </SnackbarProvider>
            </ThemeProvider>
          </BrowserRouter>
        </RecoilRoot>
      </MsalProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
