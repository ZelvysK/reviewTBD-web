import { PAGE_SIZE } from "../api";

interface Props {
  pageSize?: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (value: React.SetStateAction<number>) => void;
}

export const Pagination = ({
  pageSize = PAGE_SIZE,
  totalItems,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="join mx-auto">
      {Array.from({ length: totalPages }, (_, index) => (
        <input
          key={index}
          onClick={() => onPageChange(index + 1)}
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={(index + 1).toString()}
          checked={index + 1 === currentPage}
        />
      ))}
    </div>
  );
};
