import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Navigation } from "./navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/hooks/use-auth";

export const Layout = () => {
  const navigate = useNavigate();
  const { auth, user } = useAuthStore();

  useEffect(() => {
    if (auth === null || auth === undefined) {
      navigate("/login");
    }
  }, [auth]);

  return (
    <>
      <Navigation />
      {/* {user?.firstTimeLogin && (
        <Navigate to={`../../user/update/${user?.id}`} replace={true} />
      )} */}
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
};
