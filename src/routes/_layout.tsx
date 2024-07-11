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
    <>
      <Navigation />
      <div className="flex flex-col gap-8 container py-6 mx-auto">
        <Outlet />
      </div>
    </>
  );
};
