import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(4),
  coverUrl: z.string().url(),
  dateCreated: z.string(),
  movieStudioId: z.string(),
});

type CreateMovieForm = z.infer<typeof schema>;

export const AddMovie = () => {
  const navigate = useNavigate();

  const [_, executePost] = useAxios(
    {
      url: getUrl("movie"),
      method: "post",
    },
    { manual: true }
  );

  const onSubmit = async (data: CreateMovieForm) => {
    try {
      const response = await executePost({ data });

      const { id } = response.data;

      if (response.status === 201) {
        navigate(`../../movie/${id}`);
        toast.success("Movie updated successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register } = useForm<CreateMovieForm>({
    resolver: zodResolver(schema),
  });

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
