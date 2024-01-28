import useAxios from "axios-hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Studio } from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { Modal } from "../modal";

const MODAL_DELETE_ID = "delete-studio-modal";

export const SingleStudio = () => {
  const navigate = useNavigate();
  const { studioId } = useParams();
  const [{ data, loading, error }] = useAxios<Studio>(
    getUrl(["studio", studioId])
  );

  const [_delete, executeDelete] = useAxios(
    {
      url: getUrl(["studio", studioId]),
      method: "delete",
    },
    { manual: true }
  );

  const handleDelete = async () => {
    const response = await executeDelete();

    console.log(response);

    if (response.status === 204) {
      navigate("../../");
    }
  };

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <img
        src={data?.imageUrl}
        alt="Oopsie, image wasn't good"
        className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-48"
      />
      <div>
        <h1 className="text-5xl font-bold">{data?.name + " " + data?.type}</h1>
        <div className="font-semibold">{data?.description}</div>
        <label htmlFor={MODAL_DELETE_ID} className="btn btn-outline btn-error">
          Delete studio
        </label>
        <Link
          to={`/studio/update/${data.id}`}
          className="btn btn-active btn-neutral"
        >
          Update Studio
        </Link>
      </div>
      <Modal
        id={MODAL_DELETE_ID}
        text="Do you really want to delete the studio?"
        onConfirm={handleDelete}
      />
    </div>
  );
};
