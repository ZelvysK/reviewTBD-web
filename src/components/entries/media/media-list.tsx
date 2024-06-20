import { createAuthHeader } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import useAxios from "axios-hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_SIZE } from "../../../api";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { Media, MediaType, MediaTypes, PaginatedResult } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { PageList } from "../../pagination";
import { AdminOnly } from "@/components/admin-only";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MediaList = () => {
  const [term, setTerm] = useState<string>();
  const debouncedTerm = useDebounce(term);
  const [mediaType, setMediaType] = useState<MediaType>();

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <AdminOnly>
          <Link to={`/media/create`}>
            <Button>Add Media</Button>
          </Link>
        </AdminOnly>
        <Input
          type="text"
          value={term ?? ""}
          onChange={(e) => setTerm(e.target.value.trim())}
          placeholder="Search away..."
        />
        <Select
          value={mediaType ?? ""}
          onValueChange={(val) => setMediaType(val as MediaType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by media type if you want 🫡" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Media type</SelectLabel>
              {MediaTypes.map((mediaType) => {
                return (
                  <SelectItem key={mediaType} value={mediaType}>
                    {mediaType}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setTerm(undefined);
            setMediaType(undefined);
          }}
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
      <MediaTable type={mediaType} term={debouncedTerm} />
    </div>
  );
};

interface Props {
  type?: MediaType;
  term?: string;
}

const MediaTable = ({ type, term }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { auth } = useAuthStore();

  const [{ data, loading, error }] = useAxios<PaginatedResult<Media>>(
    {
      url: getUrl("media"),
      params: {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
        mediaType: type,
        term,
      },
      headers: createAuthHeader(auth),
    },
    { useCache: false, manual: !auth?.accessToken },
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="grid grid-cols-4">
        {data.result.map((item) => {
          return (
            <div>
              <Link
                to={`/media/${item.id}`}
                key={item.id}
                className="flex gap-2 w-fit"
              >
                <div className="grid grid-col-2 gap-4 p-2 rounded-md border-white">
                  <div className="flex justify-center col-span-2">
                    <span className="font-bold">{item.name}</span>
                  </div>
                  <div className="flex justify-center col-span-2">
                    {item.genre + " - " + item.mediaType}
                  </div>

                  <img
                    className="rounded-xl h-80 w-52"
                    src={item.coverImageUrl}
                  />
                  <ScrollArea className="h-80 w-52 rounded-md border">
                    {item.description}
                  </ScrollArea>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <PageList
        totalItems={data.total}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
