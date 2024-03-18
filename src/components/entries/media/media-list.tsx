import useAxios from "axios-hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_SIZE } from "../../../api";
import { useAuth } from "../../../hooks/use-auth";
import { Media, MediaType, MediaTypes, PaginatedResult } from "../../../types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { PageList } from "../../pagination";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";

export const MediaList = () => {
  const [term, setTerm] = useState<string>();
  const debouncedTerm = useDebounce(term);
  const [mediaType, setMediaType] = useState<MediaType>();

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <Link to={`/media/create`}>
          <Button>Add Media</Button>
        </Link>
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
  const { headers } = useAuth();

  const [{ data, loading, error }] = useAxios<PaginatedResult<Media>>(
    {
      url: getUrl("media"),
      params: {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
        mediaType: type,
        term,
      },
      headers,
    },
    { useCache: false, manual: !headers.Ready }
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }
  return (
    <>
      {data.result.map((item) => {
        return (
          <Link
            to={`/media/${item.id}`}
            key={item.id}
            className="flex gap-2 w-fit"
          >
            <div className="font-bold">{item.name}</div>
            <div>| {item.mediaType}</div>
          </Link>
        );
      })}
      <PageList
        totalItems={data.total}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
