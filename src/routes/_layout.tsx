import { Navigation } from "@/components/navigation";
import { useAuthStore } from "@/hooks/use-auth-store";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: () => <Layout />,
});

const Layout = () => {
  const { auth } = useAuthStore();

  if (auth === null || auth === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-2">
      <Navigation />
      <Outlet />
    </div>
  );
};
