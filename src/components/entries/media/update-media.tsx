import { z } from "zod";
import { Media, MediaTypes, PaginatedResult, Studio } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import useAxios, { clearCache } from "axios-hooks";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../../loader";
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
  type: z.enum(MediaTypes),
  name: z.string().min(3),
  description: z.string().min(4),
  coverImageUrl: z.string().url(),
  dateCreated: z.string(),
  studioId: z.string(),
});

type UpdateMediaForm = z.infer<typeof schema>;

export const UpdateMedia = () => {
  const navigate = useNavigate();
  const { mediaId } = useParams();

  const [{ data: mediaData, loading, error }] = useAxios<Media>(
    getUrl(["media", mediaId])
  );

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["media", mediaId]),
      method: "put",
    },
    { manual: true }
  );

  const [{ data: studioData }] = useAxios<PaginatedResult<Studio>>(
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

  const options = studioData?.result;

  const onSubmit = async (data: UpdateMediaForm) => {
    try {
      const response = await executeUpdate({ data: { id: mediaId, ...data } });

      if (response.status === 200) {
        clearCache();
        navigate(`../../media/${mediaId}`);
        toast.success("Media updated successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register, control } = useForm<UpdateMediaForm>({
    resolver: zodResolver(schema),
    values: mediaData,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!mediaData || loading) {
    return <Loader />;
  }

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

            <span className="label-text">Media type:</span>
            <Controller
              defaultValue={mediaData.type}
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
