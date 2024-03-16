import useAxios from "axios-hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_SIZE } from "../../../api";
import { useAuth } from "../../../hooks/use-auth";
import { PaginatedResult, User } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { PageList } from "../../pagination";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "../../../hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const UserList = () => {
  const [term, setTerm] = useState<string>();
  const debouncedTerm = useDebounce(term);

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <Input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search away..."
        />
        <Button
          onClick={() => {
            setTerm(undefined);
          }}
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
      <UserTable term={debouncedTerm} />
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
      <div className="grid gap-2 [grid-auto-rows:1fr;] [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
        {data.result.map((item) => {
          return (
            <Link
              to={`/user/${item.id}`}
              key={item.id}
              className="flex gap-2 bg-secondary/50 rounded-md p-2 hover:opacity-80 transition-all duration-200"
            >
              <div className="flex items-center space-x-4 w-16">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <span>{item.userName}</span>
                  <span>{item.email}</span>
                </div>
              </div>
            </Link>
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
