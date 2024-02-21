import { zodResolver } from "@hookform/resolvers/zod";
import useAxios, { clearCache } from "axios-hooks";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Studio, StudioTypes } from "../../types";
import { getUrl } from "../../utils/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../form/select";
import { Loader } from "../loader";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  type: z.enum(StudioTypes),
  name: z.string().min(3),
  description: z.string().min(4),
  imageUrl: z.string().url(),
  dateCreated: z.string(),
});

type UpdateStudioForm = z.infer<typeof schema>;

export const UpdateStudio = () => {
  const navigate = useNavigate();
  const { studioId } = useParams();
  const { headers } = useAuth();

  const [{ data, loading, error }] = useAxios<Studio>({
    url: getUrl(["studio", studioId]),
    headers,
  });

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["studio", studioId]),
      method: "put",
      headers,
    },
    { manual: true }
  );

  const onSubmit = async (data: UpdateStudioForm) => {
    try {
      const response = await executeUpdate({ data: { id: studioId, ...data } });

      if (response.status === 200) {
        clearCache();
        navigate(`../../studio/${studioId}`);
        toast.success("Studio updated successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register, control } = useForm<UpdateStudioForm>({
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
            <span className="label-text">Studio type:</span>
            <Controller
              defaultValue={data.type}
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select studio type" />
                    </SelectTrigger>
                    <SelectContent className="bg-base-100">
                      <SelectGroup>
                        <SelectLabel>Studio types</SelectLabel>
                        {StudioTypes.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />

            <div className="label">
              <span className="label-text">Name:</span>
            </div>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
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
              {...register("imageUrl")}
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
