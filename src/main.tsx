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
import { ApiException, TokenResponse } from "./hooks/useApiClient/ApiClient.generated";
import Register from "./pages/register";
import Error from "./pages/error";
import Admin from "./pages/admin";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN_STORAGE_KEY } from "./hooks/useAuthentication";

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

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_BASE}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const auth = JSON.parse(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? "null") as TokenResponse;

  return {
    headers: {
      ...headers,
      authorization: auth ? `Bearer ${auth.token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Backdrop />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </RecoilRoot>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
