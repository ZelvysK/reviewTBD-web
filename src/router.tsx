import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { StudioList } from "./components/studio/studio-list";

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
    children: [
      {
        path: "/",
        element: <StudioList />,
      },
      // {
      //   path: "/studio/:studioId",
      //   element: <SingleStudio />,
      // },
    ],
  },
]);
