import useAxios from "axios-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { StudioTypes } from "../../types";
import { getUrl } from "../../utils/navigation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../form/select";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  type: z.enum(StudioTypes),
  name: z.string().min(3),
  description: z.string().min(4),
  imageUrl: z.string().url(),
  dateCreated: z.string(),
});

type CreateStudioForm = z.infer<typeof schema>;

// type CreateStudioResponse = {
//   id: string;
//   message: string;
// };

export const AddStudio = () => {
  const navigate = useNavigate();
  const { studioId } = useParams();

  const [_, executePost] = useAxios<CreateStudioForm>(
    {
      url: getUrl("studio"),
      method: "post",
    },
    { manual: true }
  );

  const onSubmit = async (data: CreateStudioForm) => {
    try {
      const response = await executePost({ data: { id: studioId, ...data } });

      if (response.status === 200) {
        navigate(`../../studio/${studioId}`);
        toast.success("Studio created successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register, control } = useForm<CreateStudioForm>({
    resolver: zodResolver(schema),
  });

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const type = studioType?.value;

  //   if (!type) {
  //     return;
  //   }

  //   if (!StudioTypes.includes(type)) {
  //     throw new Error("Invalid studio type");
  //   }

  //   const postData: NewStudio = {
  //     name,
  //     description,
  //     imageUrl,
  //     dateCreated,
  //     type,
  //   };

  //   const { data } = await executePost({ data: postData });

  //   const { id } = data;

  //   navigate(`../../studio/${id}`);

  //   if (error) {
  //     throw new Error(error.message);
  //   }
  // };

  return (
    <div className="flex gap-48">
      <div className="form-control w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <span className="label-text">Studio type:</span>
            <Controller
              defaultValue={StudioTypes[0]}
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
