import { useAuthStore } from "@/hooks/use-auth-store";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: () => {
    const { auth } = useAuthStore();

    useEffect(() => {
      if (auth === null || auth === undefined) {
      }
    }, [auth]);

    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
