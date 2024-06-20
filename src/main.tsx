import { ThemeProvider } from "@/components/theme-provider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Axios from "axios";
import { configure } from "axios-hooks";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "./api";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const axios = Axios.create({
  baseURL: BASE_URL,
});

configure({ axios, cache: false });

const client = new ApolloClient({
  uri: "https://localhost:7203/graphql",
  cache: new InMemoryCache(),
});

// Create a new router instance
const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginRight: "50px",
              marginTop: "50px",
              borderRadius: "3px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
