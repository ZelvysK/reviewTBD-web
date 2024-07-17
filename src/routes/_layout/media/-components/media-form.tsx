import { Genre, MediaType } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { STUDIOS_QUERY } from "../../studios/-components/studio-table";
import { genreOptions, mediaTypeOptions } from "./types";

const schema = z.object({
  mediaType: z.nativeEnum(MediaType),
  genre: z.nativeEnum(Genre),
  name: z.string().min(3),
  coverImageUrl: z.string().url().or(z.literal("")),
  description: z.string().min(4).or(z.literal("")),
  studioId: z.string().uuid(),
  dateEstablished: z.date(),
});

export type MediaFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: MediaFormData) => void;
  initialData?: MediaFormData;
}

export const MediaForm = ({ onSubmit, initialData }: Props) => {
  const [triggerWidth, setTriggerWidth] = useState<number>();

  const form = useForm<MediaFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const studios = useQuery(STUDIOS_QUERY, {
    variables: {
      take: 10000,
      input: { term: undefined },
    },
  });

  const studioOptions = studios?.data?.studios?.items?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const handleTriggerWidth = (node: HTMLElement | null) => {
    if (node) {
      setTriggerWidth(node.offsetWidth);
    }
  };

  if (!studioOptions || studioOptions?.length === 0) {
    return <div>No studios found</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="studioId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Studio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      ref={handleTriggerWidth}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? studioOptions.find(
                            (studio) => studio.value === field.value,
                          )?.label
                        : "Select studio"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className=" p-0"
                  style={{ width: triggerWidth ? triggerWidth : undefined }}
                >
                  <Command>
                    <CommandInput placeholder="Search studio..." />
                    <CommandList>
                      <CommandEmpty>No studio found.</CommandEmpty>
                      <CommandGroup>
                        {studioOptions.map((studio) => (
                          <CommandItem
                            value={studio.label}
                            key={studio.value}
                            onSelect={() => {
                              form.setValue("studioId", studio.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                studio.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {studio.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mediaType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Media type" />
                  </SelectTrigger>
                  <SelectContent className="bg-base-100">
                    <SelectGroup>
                      <SelectLabel>Media types</SelectLabel>
                      {mediaTypeOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Media genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-base-100">
                    <SelectGroup>
                      <SelectLabel>Genres</SelectLabel>
                      {genreOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
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
          name="dateEstablished"
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
                        !field.value && "text-muted-foreground",
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

        {/* TODO: REMOVE */}
        <div>{JSON.stringify(form.formState.errors)}</div>
      </form>
    </Form>
  );
};
