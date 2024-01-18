import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { Studio } from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";

export const SingleStudio = () => {
  const { studioId } = useParams();
  const [{ data, loading, error }] = useAxios<Studio>(
    getUrl(["studio", studioId])
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="hero-content">
        <img
          src={data?.imageUrl}
          className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-48"
        />
        <div>
          <h1 className="text-5xl font-bold">
            {data?.name + " " + data?.type}
          </h1>
        </div>
      </div>
    </div>
  );
};
