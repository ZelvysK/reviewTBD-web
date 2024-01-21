import useAxios from "axios-hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { PAGE_SIZE } from "../../api";
import {
  Option,
  PaginatedResult,
  Studio,
  StudioType,
  StudioTypes,
} from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { Pagination } from "../pagination";

const options: Option<StudioType>[] = StudioTypes.map((item) => ({
  value: item,
  label: item,
}));

export const StudioList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studioType, setStudioType] =
    useState<SingleValue<Option<StudioType>>>(null);

  const [{ data, loading, error }] = useAxios<PaginatedResult<Studio>>({
    url: getUrl("studio"),
    params: {
      limit: PAGE_SIZE,
      offset: (currentPage - 1) * PAGE_SIZE,
      studioType: studioType?.value,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex">
        <Link to={`/studio/add`} className="btn btn-active btn-neutral">
          Add Studio
        </Link>
      </div>
      <Select
        className="text-black"
        options={options}
        placeholder="Filter by studio type if you want 🫡"
        onChange={(item) => setStudioType(item)}
        defaultValue={studioType}
        isClearable={!!studioType}
      />
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
    </div>
  );
};
