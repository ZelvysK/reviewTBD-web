import { z } from "zod";
import { MediaTypes, PaginatedResult, Studio } from "../../../types";
import { useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../../../hooks/use-auth";

const schema = z.object({
  mediaType: z.enum(MediaTypes),
  name: z.string().min(3),
  description: z.string().min(4),
  coverImageUrl: z.string().url(),
  dateCreated: z.string(),
  studioId: z.string(),
});

type CreateMediaFrom = z.infer<typeof schema>;

export const AddMedia = () => {
  const navigate = useNavigate();
  const { headers } = useAuth();

  const [_, executePost] = useAxios(
    {
      url: getUrl("media"),
      method: "post",
      headers,
    },
    {
      manual: true,
    }
  );

  const [{ data }] = useAxios<PaginatedResult<Studio>>(
    {
      url: getUrl("studio"),
      params: {
        limit: 9999,
        offset: 0,
      },
      headers,
    },
    { useCache: false, manual: !headers.Ready }
  );

  const options = data?.result;

  const onSubmit = async (data: CreateMediaFrom) => {
    try {
      const response = await executePost({ data });

      const { id } = response.data;

      if (response.status === 201) {
        navigate(`../../media/${id}`);
        toast.success("Media updated successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register, control } = useForm<CreateMediaFrom>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex gap-48">
      <div className="form-control w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
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
              <span className="label-text">Media type:</span>
            </div>
            <Controller
              defaultValue={MediaTypes[0]}
              control={control}
              name="mediaType"
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent className="bg-base-100">
                      <SelectGroup>
                        <SelectLabel>Media types</SelectLabel>
                        {MediaTypes.map((item) => (
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
              <span className="label-text">Studio:</span>
            </div>
            <Controller
              control={control}
              name="studioId"
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
                            {item.name} | {item.type}
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
