import useAxios from "axios-hooks";
import { Link, useParams } from "react-router-dom";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { useAuth } from "../../../hooks/use-auth";
import { User } from "../../../types";

export const SingleUser = () => {
  const { userId } = useParams();
  const { headers } = useAuth();
  const [{ data, loading, error }] = useAxios<User>({
    url: getUrl(["user", userId]),
    headers,
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
        <Link
          to={`/user/update/${data?.id}`}
          className="btn btn-active btn-neutral"
        >
          Update User
        </Link>
        {/* {data.role === "Admin" && (
          <Link
            to={`/user/adminupdate/${data.id}`}
            className="btn btn-active btn-neutral"
          >
            Change role
          </Link>
        )} */}
      </div>
    </div>
  );
};
