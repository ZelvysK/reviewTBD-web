import Axios from "axios";
import { configure } from "axios-hooks";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { BASE_URL } from "./api";
import "./index.css";
import { router } from "./router";

const axios = Axios.create({
  baseURL: BASE_URL,
});

configure({ axios, cache: false });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
