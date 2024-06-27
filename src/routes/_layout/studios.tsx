import { gql } from "@/__generated__";
import { AdminOnly } from "@/components/admin-only";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
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
import { useQuery } from "@apollo/client";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PAGE_SIZE } from "../../api";
import { StudioType, StudioTypes } from "../../types";

export const Route = createFileRoute("/_layout/studios")({
  component: () => <StudioList />,
});

export const StudioList = () => {
  const [term, setTerm] = useState<string>();
  const debouncedTerm = useDebounce(term);
  const [studioType, setStudioType] = useState<StudioType>();

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <AdminOnly>
          {/* <Link to={`/studio/create`}> */}
          <Button>Add Studio</Button>
          {/* </Link> */}
        </AdminOnly>
        <Input
          type="text"
          value={term ?? ""}
          onChange={(e) => setTerm(e.target.value.trim())}
          placeholder="Search away..."
        />
        <Select
          value={studioType ?? ""}
          onValueChange={(val) => setStudioType(val as StudioType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by studio type if you want 🫡" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Studio type</SelectLabel>
              {StudioTypes.map((studioType) => {
                return (
                  <SelectItem key={studioType} value={studioType}>
                    {studioType}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setTerm(undefined);
            setStudioType(undefined);
          }}
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
      <StudioTable />
    </div>
  );
};

const STUDIOS_QUERY = gql(/* GraphQL */ `
  query GetStudios($skip: Int, $take: Int) {
    studios(skip: $skip, take: $take) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        name
        description
        imageUrl
        headquarters
        founder
        studioType
        dateEstablished
      }
    }
  }
`);

const StudioTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading } = useQuery(STUDIOS_QUERY, {
    variables: {
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    },
  });

  const studios = data?.studios?.items;
  const { hasNextPage, hasPreviousPage } = data?.studios?.pageInfo || {};

  if (error) {
    throw new Error(error.message);
  }

  if (!studios || loading) {
    return <Loader />;
  }

  const onNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const onPreviousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {studios.map((item) => {
        return (
          <Link
            to={`/studio/${item.id}`}
            key={item.id}
            className="flex gap-2 bg-secondary/50 rounded-md p-2 hover:opacity-80 transition-all duration-200"
          >
            <div className="font-bold">
              {item.name} | {item.studioType}
            </div>
            <div>{format(item.dateEstablished, "yyyy-MM-dd")}</div>
          </Link>
        );
      })}
      <Pagination>
        <PaginationContent>
          {hasPreviousPage && (
            <PaginationItem>
              <PaginationLink onClick={onPreviousPage}>
                <ChevronLeft />
              </PaginationLink>
            </PaginationItem>
          )}
          {hasNextPage && (
            <PaginationItem>
              <PaginationLink onClick={onNextPage}>
                <ChevronRight />
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
