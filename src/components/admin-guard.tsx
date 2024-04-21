import { useAuthStore } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const AdminGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.role && user.role !== "Admin") {
      navigate("/");
    }
  }, [user]);

  return children;
};
