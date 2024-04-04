import { createAuthHeader } from "@/auth";
import { Button } from "@/components/ui/button";
import useAxios from "axios-hooks";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../../../hooks/use-auth";
import { User } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";

export const SingleUser = () => {
  const { userId } = useParams();
  const { auth, user } = useAuthStore();
  const [{ data, loading, error }] = useAxios<User>({
    url: getUrl(["user", userId]),
    headers: createAuthHeader(auth),
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div>
        <h1 className="text-5xl font-bold">
          {data?.userName} | {data?.role}
        </h1>
        <div className="font-semibold">{data?.email}</div>
      </div>
      <div className="flex gap-2">
        <Link to={`/user/update/${data?.id}`}>
          <Button>Update User </Button>
        </Link>
        {user?.role === "Admin" && (
          <Link to={`/user/adminupdate/${data?.id}`}>
            <Button variant="link">Change role</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
