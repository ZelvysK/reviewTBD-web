import { createBrowserRouter } from "react-router-dom";
import { AdminGuard } from "./components/admin-guard";
import { CurrentUserOnlyGuard } from "./components/current-user-only-guard";
import { AddMedia } from "./components/entries/media/add-media";
import { MediaList } from "./components/entries/media/media-list";
import { SingleMedia } from "./components/entries/media/single-media";
import { UpdateMedia } from "./components/entries/media/update-media";
import { Login } from "./components/entries/user/login";
import { SingleUser } from "./components/entries/user/single-user";
import { UpdateAdmin } from "./components/entries/user/update-admin";
import { UpdatePassword } from "./components/entries/user/update-password";
import { UpdateUser } from "./components/entries/user/update-user";
import { UserList } from "./components/entries/user/user-list";
import { ErrorBoundary } from "./components/error-boundary";
import { Layout } from "./components/layout";
import { SingleStudio, StudioList } from "./components/studio";
import { AddStudio } from "./components/studio/add-studio";
import { UpdateStudio } from "./components/studio/update-studio";

type Route = {
  name: string;
  href: string;
  admin?: true;
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
    admin: true,
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
        element: (
          <AdminGuard>
            <AddStudio />
          </AdminGuard>
        ),
      },
      {
        path: "/studio/update/:studioId",
        element: (
          <AdminGuard>
            <UpdateStudio />
          </AdminGuard>
        ),
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
        element: (
          <AdminGuard>
            <AddMedia />
          </AdminGuard>
        ),
      },
      {
        path: "/media/update/:mediaId",
        element: (
          <AdminGuard>
            <UpdateMedia />
          </AdminGuard>
        ),
      },
      {
        path: "/user/adminupdate/:userId",
        element: (
          <AdminGuard>
            <UpdateAdmin />
          </AdminGuard>
        ),
      },
      {
        path: "/user",
        element: (
          <AdminGuard>
            <UserList />
          </AdminGuard>
        ),
      },
      {
        path: "/user/:userId",
        element: (
          <CurrentUserOnlyGuard>
            <SingleUser />
          </CurrentUserOnlyGuard>
        ),
      },
      {
        path: "/user/update/:userId",
        element: (
          <CurrentUserOnlyGuard>
            <UpdateUser />
          </CurrentUserOnlyGuard>
        ),
      },
      {
        path: "/user/changePassword/:userId",
        element: (
          <CurrentUserOnlyGuard>
            <UpdatePassword />
          </CurrentUserOnlyGuard>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
