import { createFileRoute } from "@tanstack/react-router";
import { useMediaTableStore } from "./-components/use-media-table-store";
import { useDebounce } from "@/hooks/use-debounce";
import { PageList } from "@/components/pagination";
import { TableHeader } from "./-components/table-header";
import { MediaTable } from "./-components/media-table";

export const Route = createFileRoute("/_layout/media/")({
  component: () => <MediaPage />,
});

export const MediaPage = () => {
  const tableStore = useMediaTableStore((state) => ({
    totalCount: state.totalCount,
    pageNumber: state.pageNumber,
    hasNextPage: state.hasNextPage,
    hasPreviousPage: state.hasPreviousPage,
    term: state.term,
    setCurrentPage: state.setCurrentPage,
    handleNextPage: state.handleNextPage,
    handlePreviousPage: state.handlePreviousPage,
    setTerm: state.setTerm,
  }));

  const { term, ...restStore } = tableStore;

  const debouncedTerm = useDebounce(term);

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <TableHeader />
      <MediaTable term={debouncedTerm} />
      <PageList {...restStore} />
    </div>
  );
};
