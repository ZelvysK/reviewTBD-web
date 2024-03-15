import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { routes } from "../router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RoleType } from "@/types";
import { cn } from "@/lib/utils";

const resolveBadge = (role?: RoleType) => {
  if (role === "Admin") {
    return "default" as const;
  }

  return "secondary" as const;
};

export const Navigation = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="flex bg-secondary/60 p-5 gap-5 items-center justify-between">
      <NavbarBrand />

      <div className="flex gap-5 items-center justify-center">
        {routes.map(({ href, name }, index) => {
          return (
            <span
              className={cn(pathname === href && "text-primary")}
              key={index}
            >
              <Link to={href}>{name}</Link>
            </span>
          );
        })}
      </div>

      <div className="flex gap-5 items-center justify-center">
        <Link to={`/user/me`}>Hello, {user?.userName}!</Link>
        <Badge variant={resolveBadge(user?.role)}>{user?.role}</Badge>
        <Button variant="destructive" onClick={logout}>
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
