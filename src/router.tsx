import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/error-boundary";
import { Layout } from "./components/layout";
import { SingleStudio, StudioList } from "./components/studio";
import { AddStudio } from "./components/studio/add-studio";
import { UpdateStudio } from "./components/studio/update-studio";
import { MediaList } from "./components/entries/media/media-list";
import { SingleMedia } from "./components/entries/media/single-media";
import { AddMedia } from "./components/entries/media/add-media";
import { UpdateMedia } from "./components/entries/media/update-media";

type Route = {
  name: string;
  url: string;
};

export const routes: Route[] = [
  {
    name: "Studios",
    url: "/",
  },
  {
    name: "Media",
    url: "/media",
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
      {
        path: "/studio/create",
        element: <AddStudio />,
      },
      {
        path: "/studio/update/:studioId",
        element: <UpdateStudio />,
      },
      {
        path: "/media",
        element: <MediaList />,
      },
      {
        path: "/media/:mediaId",
        element: <SingleMedia />,
      },
      {
        path: "/media/create",
        element: <AddMedia />,
      },
      {
        path: "/media/update/:mediaId",
        element: <UpdateMedia />,
      },
    ],
  },
]);
