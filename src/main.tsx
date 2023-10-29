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
import Points from "./pages/points";
import Statistics from "./pages/statistics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiException } from "./hooks/useApiClient/ApiClient.generated";
import Register from "./pages/register";
import Error from "./pages/error";
import Admin from "./pages/admin";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/points",
        element: <Points />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      { path: "/admin", element: <Admin /> },
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
