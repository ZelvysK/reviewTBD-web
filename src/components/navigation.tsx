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
