import { useAuthStore } from "@/hooks/use-auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigation } from "./navigation";

export const Layout = () => {
  const navigate = useNavigate();
  const { auth } = useAuthStore();

  useEffect(() => {
    if (auth === null || auth === undefined) {
      navigate("/login");
    }
  }, [auth]);

  return (
    <>
      <Navigation />
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
};
