import useAxios from "axios-hooks";
import { useState } from "react";
import { Anime, PaginatedResult } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { PAGE_SIZE } from "../../../api";
import { Loader } from "../../loader";
import { Pagination } from "../../pagination";
import { Link } from "react-router-dom";

export const AnimeList = () => {
  const [term, setTerm] = useState<string>();

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <Link to={`/anime/create`} className="btn btn-active btn-neutral">
          Add Anime
        </Link>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search away..."
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <AnimeTable term={term} />
    </div>
  );
};

interface Props {
  term?: string;
}

const AnimeTable = ({ term }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [{ data, loading, error }] = useAxios<PaginatedResult<Anime>>(
    {
      url: getUrl("anime"),
      params: {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
        term,
      },
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
          <Link to={`/anime/${item.id}`} key={item.id} className="flex gap-2">
            <div className="font-bold">{item.title}</div>
            <div>| {item.dateCreated}</div>
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
