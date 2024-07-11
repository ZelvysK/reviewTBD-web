import { useUser } from "@/hooks/use-user-store";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../hooks/use-auth-store";
import { Loader } from "./loader";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const Navigation = () => {
  const { logout } = useAuthStore();
  const { user } = useUser();

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="flex bg-secondary/60 p-5 gap-5 items-center justify-between">
      <NavbarBrand />
      <div className="flex gap-5 items-center justify-center">
        <Link className="[&.active]:text-primary" to={"/studios"}>
          Studios
        </Link>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <Link to={`/user/${user.id}`}>Hello, {user.name}!</Link>
        <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
          {user.role}
        </Badge>
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
