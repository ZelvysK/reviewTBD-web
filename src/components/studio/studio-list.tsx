import useAxios from "axios-hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { PAGE_SIZE } from "../../api";
import {
  Option,
  PaginatedResult,
  Studio,
  StudioOptions,
  StudioType,
} from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { Pagination } from "../pagination";
import { useAuth } from "../../hooks/use-auth";

export const StudioList = () => {
  const [term, setTerm] = useState<string>();
  const [studioType, setStudioType] =
    useState<SingleValue<Option<StudioType>>>(null);

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <Link to={`/studio/create`} className="btn btn-active btn-neutral">
          Add Studio
        </Link>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value.trim())}
          placeholder="Search away..."
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <Select
        className="text-black"
        options={StudioOptions}
        placeholder="Filter by studio type if you want 🫡"
        onChange={(item) => setStudioType(item)}
        defaultValue={studioType}
        isClearable={!!studioType}
      />
      <StudioTable type={studioType?.value} term={term} />
    </div>
  );
};

interface Props {
  type?: StudioType;
  term?: string;
}

const StudioTable = ({ type, term }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { headers } = useAuth();
  const [{ data, loading, error }] = useAxios<PaginatedResult<Studio>>({
    url: getUrl("studio"),
    params: {
      limit: PAGE_SIZE,
      offset: (currentPage - 1) * PAGE_SIZE,
      studioType: type,
      term,
    },
    headers,
  });

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
          <Link to={`/studio/${item.id}`} key={item.id} className="flex gap-2">
            <div className="font-bold">
              {item.name} | {item.type}
            </div>
            <div>{item.dateCreated}</div>
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
