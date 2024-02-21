import useAxios from "axios-hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Media,
  MediaType,
  PaginatedResult,
  Option,
  MediaOptions,
} from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { PAGE_SIZE } from "../../../api";
import { Loader } from "../../loader";
import { Pagination } from "../../pagination";
import Select, { SingleValue } from "react-select";
import { useAuth } from "../../../hooks/useAuth";

export const MediaList = () => {
  const [term, setTerm] = useState<string>();
  const [mediaType, setMediaType] =
    useState<SingleValue<Option<MediaType>>>(null);

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <Link to={`/media/create`} className="btn btn-active btn-neutral">
          Add Media
        </Link>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search away..."
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <Select
        className="text-black"
        options={MediaOptions}
        placeholder="Filter by media type if you want 🫡"
        onChange={(item) => setMediaType(item)}
        defaultValue={mediaType}
        isClearable={!!mediaType}
      />
      <MediaTable type={mediaType?.value} term={term} />
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
    { useCache: false }
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
          <Link to={`/media/${item.id}`} key={item.id} className="flex gap-2">
            <div className="font-bold">{item.name}</div>
            <div>| {item.mediaType}</div>
          </Link>
        );
      })}
      <Pagination
        totalItems={data.total}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
