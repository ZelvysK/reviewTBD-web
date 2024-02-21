import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";
import { useAtom } from "jotai";
import { authAtom } from "../auth";

export const Layout = () => {
  const [authData, setAuthData] = useAtom(authAtom);

  return (
    <>
      <Navigation />
      <div className="p-2">
        <Outlet />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "3px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
};
