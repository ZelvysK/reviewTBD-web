import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { Movie } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";

export const SingleMovie = () => {
  const { movieId } = useParams();
  const [{ data, loading, error }] = useAxios<Movie>(
    getUrl(["movie", movieId])
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  if (!data && !loading) {
    return (
      <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
        <h3 className="font-bold">Sorry, movie data not added!</h3>
      </div>
    );
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="hero-content">
        <img
          src={data?.coverUrl}
          className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-48"
        />
        <div>
          <h1 className="text-5xl font-bold">{data?.title}</h1>
          <div className="font-semibold">{data?.description}</div>
        </div>
      </div>
    </div>
  );
};
