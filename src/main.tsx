import Axios from "axios";
import { configure } from "axios-hooks";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { BASE_URL } from "./api";
import "./index.css";
import { router } from "./router";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

const axios = Axios.create({
  baseURL: BASE_URL,
});

configure({ axios, cache: false });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
    </ThemeProvider>
  </React.StrictMode>
);
