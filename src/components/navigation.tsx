import { Link } from "react-router-dom";
import { routes } from "../router";

export const Navigation = () => {
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
