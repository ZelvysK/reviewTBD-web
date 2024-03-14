import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { routes } from "../router";

export const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-secondary/60">
      <div className="navbar-start">
        <NavbarBrand />
      </div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end flex">
        <ul className="menu menu-horizontal px-1">
          {user && (
            <>
              <li className="flex items-center justify-center">
                <Link to={`/user/me`}>
                  Hello, {user.userName}! | {user.role}
                </Link>
              </li>
              <li className="px-2">
                <button
                  className="btn btn-ghost text-base bg-red-700 w-16 border-warning"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to={"/login"} className="btn btn-ghost text-base">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/register"} className="btn btn-ghost text-base">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const NavbarBrand = () => {
  return (
    <Link to="/" className="btn btn-ghost text-xl">
      Review <strong>App</strong>
    </Link>
  );
};
