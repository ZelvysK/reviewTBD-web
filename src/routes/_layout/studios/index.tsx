import { PageList } from "@/components/pagination";
import { useDebounce } from "@/hooks/use-debounce";
import { createFileRoute } from "@tanstack/react-router";
import { StudioTable } from "./-components/studio-table";
import { TableHeader } from "./-components/table-header";
import { useStudioTableStore } from "./-components/use-studio-table-store";

export const Route = createFileRoute("/_layout/studios/")({
  component: () => <StudioList />,
});

export const StudioList = () => {
  const tableStore = useStudioTableStore((state) => ({
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
      <StudioTable term={debouncedTerm} />
      <PageList {...restStore} />
    </div>
  );
};
