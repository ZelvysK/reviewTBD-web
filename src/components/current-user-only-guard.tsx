import { useAuthStore } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const CurrentUserOnlyGuard = ({ children }: Props) => {
  const { userId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role && user.role === "Admin") {
      return;
    }

    if (user?.id && user.id !== userId) {
      navigate("/");
    }
  }, [user]);

  return children;
};
