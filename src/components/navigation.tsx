import { RoleType } from "@/types";
import { useAuthStore } from "../hooks/use-auth-store";
import { routes } from "../router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

const resolveBadge = (role?: RoleType) => {
  if (role === "Admin") {
    return "default" as const;
  }

  return "secondary" as const;
};

export const Navigation = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex bg-secondary/60 p-5 gap-5 items-center justify-between">
      <NavbarBrand />

      <div className="flex gap-5 items-center justify-center">
        {routes.map(({ href, name, admin }, idx) => {
          if (admin && user?.role !== "Admin") {
            return null;
          }

          return (
            <Link key={idx} className="[&.active]:text-primary" to={href}>
              {name}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-5 items-center justify-center">
        <Link to={`/user/${user?.id}`}>Hello, {user?.userName}!</Link>
        <Badge variant={resolveBadge(user?.role)}>{user?.role}</Badge>
        <Button
          variant="destructive"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

const NavbarBrand = () => {
  return (
    <Link to="/" className="text-xl">
      Review <strong>App</strong>
    </Link>
  );
};
