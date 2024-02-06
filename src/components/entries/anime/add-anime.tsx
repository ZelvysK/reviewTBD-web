import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "axios-hooks";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { PaginatedResult, Studio } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../form/select";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(4),
  coverImageUrl: z.string().url(),
  dateCreated: z.string(),
  animeStudioId: z.string(),
});

type CreateAnimeForm = z.infer<typeof schema>;

export const AddAnime = () => {
  const navigate = useNavigate();

  const [_, executePost] = useAxios(
    {
      url: getUrl("anime"),
      method: "post",
    },
    { manual: true }
  );

  const [{ data }] = useAxios<PaginatedResult<Studio>>(
    {
      url: getUrl("studio"),
      params: {
        limit: 9999,
        offset: 0,
        studioType: "anime",
      },
    },
    { useCache: false }
  );

  const options = data?.result;

  const onSubmit = async (data: CreateAnimeForm) => {
    try {
      const response = await executePost({ data });

      const { id } = response.data;

      if (response.status === 201) {
        navigate(`../../anime/${id}`);
        toast.success("Anime updated successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register, control } = useForm<CreateAnimeForm>({
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
              <span className="label-text">Studio:</span>
            </div>
            <Controller
              control={control}
              name="animeStudioId"
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select studio" />
                    </SelectTrigger>
                    <SelectContent className="bg-base-100">
                      <SelectGroup>
                        <SelectLabel>Studios</SelectLabel>
                        {options?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
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
              {...register("coverImageUrl")}
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
