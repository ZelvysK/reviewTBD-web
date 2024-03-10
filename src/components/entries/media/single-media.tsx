import useAxios from "axios-hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Media } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { Modal } from "../../modal";
import { useAuth } from "../../../hooks/useAuth";

const MODAL_DELETE_ID = "delete-media-modal";

export const SingleMedia = () => {
  const navigate = useNavigate();
  const { mediaId } = useParams();
  const { headers } = useAuth();
  const [{ data, loading, error }] = useAxios<Media>({
    url: getUrl(["media", mediaId]),
    headers,
  });

  const [_delete, executeDelete] = useAxios(
    {
      url: getUrl(["media", mediaId]),
      method: "delete",
      headers,
    },
    {
      manual: true,
    }
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
        src={data?.coverImageUrl}
        alt="Oopsie, image wasn't good"
        className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-48"
      />
      <div>
        <h1 className="text-5xl font-bold">
          {data?.name + " |" + data?.mediaType}
        </h1>
        <div className="font-semibold">{data?.description}</div>
        <div className="font-semibold">{data?.coverImageUrl}</div>
        <div className="font-semibold">{data?.dateCreated}</div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/media/update/${data.id}`}
          className="btn btn-active btn-neutral"
        >
          Update media
        </Link>
        <label htmlFor={MODAL_DELETE_ID} className="btn btn-outline btn-error">
          Delete media
        </label>
      </div>
      <Modal
        id={MODAL_DELETE_ID}
        text={`Do you really want to delete ${data.name}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
};
