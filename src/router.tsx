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
import { Login } from "./components/entries/user/login";
import { Register } from "./components/entries/user/register";
import { UserList } from "./components/entries/user/user-list";
import { SingleUser } from "./components/entries/user/single-user";
import { UpdateUser } from "./components/entries/user/update-user";
import { UpdatePassword } from "./components/entries/user/update-password";

type Route = {
  name: string;
  href: string;
};

export const routes: Route[] = [
  {
    name: "Studios",
    href: "/",
  },
  {
    name: "Media",
    href: "/media",
  },
  {
    name: "Users",
    href: "/user",
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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: <UserList />,
      },
      {
        path: "/user/:userId",
        element: <SingleUser />,
      },
      {
        path: "/user/update/:userId",
        element: <UpdateUser />,
      },
      {
        path: "/user/changePassword/:userId",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
