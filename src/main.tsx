import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "jotai";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import Backdrop from "./components/Backdrop";
import Root from "./pages/root";
import DealSelector from "./pages";
import Login from "./pages/login";
import LocationSelection from "./pages/location";
import DealSelection from "./pages/code/DealSelection";
import Spending from "./pages/spending";
import Points from "./pages/points";
import PointAccount from "./pages/points/PointAccount";
import Statistics from "./pages/statistics";
import Admin from "./pages/admin";
import AdminSpending from "./pages/admin/spending";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <DealSelector />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/location",
        element: <LocationSelection />,
      },
      {
        path: "/code/:dealId",
        element: <DealSelection />,
      },
      {
        path: "/spending",
        element: <Spending />,
      },
      {
        path: "/points",
        element: <Points />,
      },
      {
        path: "/points/:accountId",
        element: <PointAccount />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/spending",
        element: <AdminSpending />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <Backdrop />
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ThemeProvider>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);
