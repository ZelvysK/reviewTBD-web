import useAxios from "axios-hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { Modal } from "../../modal";
import { useAuth } from "../../../hooks/useAuth";
import { User } from "../../../types";

// const MODAL_DELETE_ID = "delete-media-modal";

export const SingleUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { headers } = useAuth();
  const [{ data, loading, error }] = useAxios<User>({
    url: getUrl(["user", userId]),
    headers,
  });

  // const [_delete, executeDelete] = useAxios(
  //   {
  //     url: getUrl(["user", userId]),
  //     method: "delete",
  //     headers,
  //   },
  //   {
  //     manual: true,
  //   }
  // );

  // const handleDelete = async () => {
  //   const response = await executeDelete();

  //   console.log(response);

  //   if (response.status === 204) {
  //     navigate("../../");
  //   }
  // };

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div>
        <h1 className="text-5xl font-bold">{data?.username}</h1>
        <div className="font-semibold">{data?.email}</div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/user/update/${data.id}`}
          className="btn btn-active btn-neutral"
        >
          Update User
        </Link>
      </div>
      {/* <Modal
        id={MODAL_DELETE_ID}
        text={`Do you really want to delete ${data.name}?`}
        onConfirm={handleDelete}
      /> */}
    </div>
  );
};
