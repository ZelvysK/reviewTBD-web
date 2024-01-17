import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";

export const Layout = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-col gap-2">
        <Outlet />
      </div>
    </>
  );
};
