import useAxios, { clearCache } from "axios-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Movie } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "../../loader";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(4),
  coverUrl: z.string().url(),
  dateCreated: z.string(),
});

type UpdateMovieForm = z.infer<typeof schema>;

export const UpdateMovie = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [{ data, loading, error }] = useAxios<Movie>(
    getUrl(["movie", movieId])
  );

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["movie", movieId]),
      method: "put",
    },
    { manual: true }
  );

  const onSubmit = async (data: UpdateMovieForm) => {
    try {
      const response = await executeUpdate({ data: { id: movieId, ...data } });

      if (response.status === 200) {
        clearCache();
        navigate(`../../movie/${movieId}`);
        toast.success("Movie updated successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register } = useForm<UpdateMovieForm>({
    resolver: zodResolver(schema),
    values: data,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-48">
      <div className="form-control w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="label">
              <span className="label-text">Title:</span>
            </div>
            <input
              {...register("title")}
              type="text"
              placeholder="Title"
              className="input input-bordered input-sm w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text">Description:</span>
            </div>
            <textarea
              {...register("description")}
              placeholder="Enter description..."
              className="textarea textarea-bordered"
            />

            <div className="label">
              <span className="label-text">Image URL:</span>
            </div>
            <input
              {...register("coverUrl")}
              type="text"
              placeholder="Image URL"
              className="input input-bordered input-sm w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text">Date created:</span>
            </div>
            <input
              {...register("dateCreated")}
              type="date"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
