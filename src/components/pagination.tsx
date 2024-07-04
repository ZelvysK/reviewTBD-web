import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE } from "../api";

interface Props {
  pageSize?: number;
  totalCount: number;
  pageNumber: number;
  setCurrentPage: (pageNumber: number) => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
}

export const PageList = ({
  pageSize = PAGE_SIZE,
  totalCount,
  pageNumber,
  setCurrentPage,
  hasNextPage,
  hasPreviousPage,
  handleNextPage,
  handlePreviousPage,
}: Props) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <Pagination>
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationLink onClick={handlePreviousPage}>
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem className="cursor-pointer" key={index}>
            <PaginationLink
              onClick={() => setCurrentPage(index + 1)}
              isActive={index + 1 === pageNumber}
            >
              {(index + 1).toString()}
            </PaginationLink>
          </PaginationItem>
        ))}
        {hasNextPage && (
          <PaginationItem>
            <PaginationLink onClick={handleNextPage}>
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
