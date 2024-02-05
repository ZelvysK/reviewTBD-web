import useAxios from "axios-hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Game } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { Modal } from "../../modal";

const MODAL_DELETE_ID = "delete-game-modal";

export const SingleGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [{ data, loading, error }] = useAxios<Game>(getUrl(["game", gameId]));

  const [_delete, executeDelete] = useAxios(
    {
      url: getUrl(["game", gameId]),
      method: "delete",
    },
    { manual: true }
  );

  const handleDelete = async () => {
    const response = await executeDelete();

    console.log(response);

    if (response.status === 204) {
      navigate("../../game");
    }
  };

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  if (!data && !loading) {
    return (
      <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
        <h3 className="font-bold">Sorry, game data not added!</h3>
      </div>
    );
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <img
        src={data?.coverImageUrl}
        alt="Oopsie, image wasn't good"
        className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-48"
      />
      <div>
        <h1 className="text-5xl font-bold">{data?.title}</h1>
        <div className="font-semibold">{data?.description}</div>
        <div className="font-semibold">{data?.coverImageUrl}</div>
        <div className="font-semibold">{data?.dateCreated}</div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/game/update/${data.id}`}
          className="btn btn-active btn-neutral"
        >
          Update
        </Link>
        <label htmlFor={MODAL_DELETE_ID} className="btn btn-outline btn-error">
          Delete
        </label>
      </div>
      <Modal
        id={MODAL_DELETE_ID}
        text="Do you really want to delete the game?"
        onConfirm={handleDelete}
      />
    </div>
  );
};
