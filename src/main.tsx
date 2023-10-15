import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "jotai";
import { RecoilRoot } from "recoil";
import Backdrop from "./components/Backdrop";
import Root from "./pages/root";
import DealSelector from "./pages";
import Login from "./pages/login";
import DealSelection from "./pages/code/DealSelection";
import Spending from "./pages/spending";
import Points from "./pages/points";
import Statistics from "./pages/statistics";
import Admin from "./pages/admin";
import AdminSpending from "./pages/admin/spending";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Backdrop />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);
