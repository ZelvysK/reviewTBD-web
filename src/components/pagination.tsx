import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "../api";

interface Props {
  pageSize?: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const PageList = ({
  pageSize = PAGE_SIZE,
  totalItems,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => onPageChange(index + 1)}
              isActive={index + 1 === currentPage}
            >
              {(index + 1).toString()}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};
