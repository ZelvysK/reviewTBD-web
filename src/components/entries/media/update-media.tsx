import { createAuthHeader } from "@/auth";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios, { clearCache } from "axios-hooks";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../../../hooks/use-auth";
import {
  Genres,
  Media,
  MediaTypes,
  PaginatedResult,
  Studio,
} from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";

const schema = z.object({
  mediaType: z.enum(MediaTypes),
  genre: z.enum(Genres),
  name: z.string().min(3),
  description: z.string().min(4),
  coverImageUrl: z.string().url(),
  dateCreated: z.date(),
  studioId: z.string(),
  publishedBy: z.string(),
});

type UpdateMediaForm = z.infer<typeof schema>;

export const UpdateMedia = () => {
  const navigate = useNavigate();
  const { mediaId } = useParams();
  const { auth } = useAuthStore();

  const [{ data: mediaData, loading, error }] = useAxios<Media>({
    url: getUrl(["media", mediaId]),
    headers: createAuthHeader(auth),
  });

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["media", mediaId]),
      method: "put",
      headers: createAuthHeader(auth),
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
      headers: createAuthHeader(auth),
    },
    { useCache: false, manual: !auth?.accessToken }
  );

  const options = studioData?.result;

  const onSubmit = async (data: UpdateMediaForm) => {
    try {
      console.log(data);
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

  const form = useForm<UpdateMediaForm>({
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
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-base-100">
                        <SelectGroup>
                          <SelectLabel>Genres</SelectLabel>
                          {Genres.map((item) => (
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
              name="publishedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Publisher..."
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
              name="dateCreated"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date created</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription />
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
