import { useUser } from "@/hooks/use-user-store";

interface Props {
  children: React.ReactNode;
}

export const AdminOnly = ({ children }: Props) => {
  const { user } = useUser();

  return user?.role === "ADMIN" ? children : null;
};
