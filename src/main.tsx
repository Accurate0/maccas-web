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
import Points from "./pages/points";
import Statistics from "./pages/statistics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiException } from "./hooks/useApiClient/ApiClient.generated";

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
        path: "/points",
        element: <Points />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
    ],
  },
]);

const retry = (failureCount: number, error: Error) => {
  if (failureCount < 5 && ApiException.isApiException(error) && error.status > 500) {
    return true;
  }

  return false;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry,
      retryDelay: 1,
    },
    mutations: { retry, retryDelay: 1 },
  },
});

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
