import { z } from "zod";
import {
  Media,
  MediaTypes,
  PaginatedResult,
  Studio,
  StudioTypes,
} from "../../../types";
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
} from "@/components/ui/select";
import { useAuth } from "../../../hooks/use-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { register } from "module";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  mediaType: z.enum(MediaTypes),
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
  const { headers } = useAuth();

  const [{ data: mediaData, loading, error }] = useAxios<Media>({
    url: getUrl(["media", mediaId]),
    headers,
  });

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["media", mediaId]),
      method: "put",
      headers,
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
      headers,
    },
    { useCache: false, manual: !headers.Ready }
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

  // const { handleSubmit, register, control } = useForm<UpdateMediaForm>({
  //   resolver: zodResolver(schema),
  //   values: mediaData,
  // });

  const form = useForm<z.infer<typeof schema>>({
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="mediaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select meida type" />
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studioId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Studio</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value ?? ""}
                    >
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description..."
                      className="textarea textarea-bordered"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Image URL"
                      className="input input-bordered input-sm w-full max-w-xs"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="label">
              <span className="label-text">Date created:</span>
            </div>
            <input
              {...register("dateCreated")}
              type="date"
              className="input input-bordered input-sm w-full max-w-xs"
            /> */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
