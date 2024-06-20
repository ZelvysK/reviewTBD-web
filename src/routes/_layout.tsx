import { Navigation } from "@/components/navigation";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: () => (
    <div className="p-2">
      <Navigation />
      <Outlet />
    </div>
  ),
});
