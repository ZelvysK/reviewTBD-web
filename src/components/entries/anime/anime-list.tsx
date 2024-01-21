import useAxios from "axios-hooks";
import { useState } from "react";
import { Anime, PaginatedResult } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { PAGE_SIZE } from "../../../api";
import { Loader } from "../../loader";
import { Pagination } from "../../pagination";
import { Link } from "react-router-dom";

export const AnimeList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [{ data, loading }] = useAxios<PaginatedResult<Anime>>({
    url: getUrl("anime"),
    params: {
      limit: PAGE_SIZE,
      offset: (currentPage - 1) * PAGE_SIZE,
    },
  });

  if (!data || loading) {
    return <Loader />;
  }

  if (data.result.length === 0 || (!data && !loading)) {
    return (
      <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
        <h3 className="font-bold">Sorry, anime data not added!</h3>
      </div>
    );
  }

  return (
    <div className="card card-side bg-secondary/30 shadow-xl flex flex-col gap-2 p-3 mt-2">
      {data.result.map((item) => {
        return (
          <Link to={`/anime/${item.id}`} key={item.id} className="flex gap-2">
            <div className="font-bold">
              {item.title} | {item.dateCreated}
            </div>
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
