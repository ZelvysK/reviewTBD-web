import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "axios-hooks";
import { PaginatedResult, User } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { PAGE_SIZE } from "../../../api";
import { Loader } from "../../loader";
import { Link } from "react-router-dom";
import { Pagination } from "../../pagination";
import { Skeleton } from "../../../utils/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../../../utils/avatar";

export const UserList = () => {
  const [term, setTerm] = useState<string>();

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search away..."
        className="input input-bordered w-full max-w-xs"
      />
      <UserTable term={term} />
    </div>
  );
};

interface Props {
  term?: string;
}

const UserTable = ({ term }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { headers } = useAuth();

  const [{ data, loading, error }] = useAxios<PaginatedResult<User>>(
    {
      url: getUrl("user"),
      params: {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
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
          <Link to={`/user/${item.id}`} key={item.id} className="flex gap-2">
            <div className="flex items-center space-x-4 w-16">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Skeleton className="h-1 w-[250px]" />
                {item.userName}
                <Skeleton className="h-1 w-[200px]" />
                {item.email}
              </div>
            </div>
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
