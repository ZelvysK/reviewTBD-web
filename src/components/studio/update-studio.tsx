import { zodResolver } from "@hookform/resolvers/zod";
import useAxios, { clearCache } from "axios-hooks";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/select";
import { Loader } from "../loader";
import { useAuth } from "../../hooks/use-auth";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Calendar } from "lucide-react";
import { format } from "path";

const schema = z.object({
  type: z.enum(StudioTypes),
  name: z.string().min(3),
  description: z.string().min(4),
  imageUrl: z.string().url(),
  // dateCreated: z.date({
  //   required_error: "A date is required.",
  // }),
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
        {/* 
            <div className="label">
              <span className="label-text">Date created:</span>
            </div>
            <Input
              {...register("dateCreated")}
              type="date"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <Button type="submit">Submit</Button>
          </div>
        </form> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
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
                    <Input placeholder="Name..." {...field} />
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
                    />
                  </FormControl>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="dateCreated"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Created</FormLabel>
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
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
