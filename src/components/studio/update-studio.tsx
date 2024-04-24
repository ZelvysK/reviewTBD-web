import { createAuthHeader } from "@/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "axios-hooks";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../../hooks/use-auth";
import { Studio, StudioTypes } from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

const schema = z.object({
  type: z.enum(StudioTypes),
  name: z.string().min(3),
  description: z.string().min(4),
  imageUrl: z.string().url(),
  headquarters: z.string(),
  founder: z.string(),
  dateCreated: z.string(),
});

type UpdateStudioForm = z.infer<typeof schema>;

export const UpdateStudio = () => {
  const navigate = useNavigate();
  const { studioId } = useParams();
  const { auth } = useAuthStore();

  const [{ data, loading, error }] = useAxios<Studio>({
    url: getUrl(["studio", studioId]),
    headers: createAuthHeader(auth),
  });

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["studio", studioId]),
      method: "put",
      headers: createAuthHeader(auth),
    },
    { manual: true }
  );

  const onSubmit = async (data: UpdateStudioForm) => {
    try {
      const response = await executeUpdate({
        data: { id: studioId, ...data },
      });

      if (response.status === 200) {
        navigate(`../../studio/${studioId}`);
        toast.success("Studio updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  const form = useForm<z.infer<typeof schema>>({
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
              name="headquarters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headquarters location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Headquarters location..."
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
              name="founder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Founder</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Founder..."
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
                            format(field.value, "yyyy-MM-dd")
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
                        selected={new Date(field.value)}
                        onSelect={(selectedDate) =>
                          field.onChange(
                            format(selectedDate ?? "", "yyyy-MM-dd")
                          )
                        }
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
              name="imageUrl"
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
