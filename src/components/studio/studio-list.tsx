import useAxios from "axios-hooks";
import { PaginatedResult, Studio, StudioType, StudioTypes } from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { useState } from "react";
import { Pagination } from "../pagination";
import { PAGE_SIZE } from "../../api";
import Select, { SingleValue } from "react-select";

interface Option<T> {
  value: T;
  label: string;
}

export const StudioList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studioType, setStudioType] =
    useState<SingleValue<Option<StudioType>>>(null);

  const [{ data, loading }] = useAxios<PaginatedResult<Studio>>(
    getUrl([
      "Studio",
      `?limit=${PAGE_SIZE}&offset=${currentPage * PAGE_SIZE - PAGE_SIZE}${
        studioType ? "&studioType=" + studioType.value : ""
      }`,
    ])
  );

  const options: Option<StudioType>[] = StudioTypes.map((item) => ({
    value: item,
    label: item,
  }));

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="card card-side bg-secondary/30 shadow-xl flex flex-col gap-2 p-3 mt-2">
      <div className="flex gap-2">
        <div>Limit: {data.limit}</div>
        <div>Offset: {data.offset}</div>
        <div>Total: {data.total}</div>
      </div>
      <Select
        className="text-black"
        options={options}
        onChange={(a) => setStudioType(a)}
        defaultValue={studioType}
      />
      {data.result.map((item) => {
        return (
          <div key={item.id} className="flex gap-2">
            <div className="font-bold">
              {item.name} | {item.type}
            </div>
            <div>{item.foundedDate}</div>
          </div>
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
