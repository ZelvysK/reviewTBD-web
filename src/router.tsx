import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/error-boundary";
import { Layout } from "./components/layout";
import { SingleStudio, StudioList } from "./components/studio";

type Route = {
  name: string;
  url: string;
};

export const routes: Route[] = [
  {
    name: "Studios",
    url: "/",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <StudioList />,
      },
      {
        path: "/studio/:studioId",
        element: <SingleStudio />,
      },
    ],
  },
]);
