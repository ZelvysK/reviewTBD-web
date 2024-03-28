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
import useAxios from "axios-hooks";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { PAGE_SIZE } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { PaginatedResult, Studio, StudioType, StudioTypes } from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { PageList } from "../pagination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const StudioList = () => {
  const [term, setTerm] = useState<string>();
  const debouncedTerm = useDebounce(term);
  const [studioType, setStudioType] = useState<StudioType>();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.firstTimeLogin) {
      return navigate(`../../user/update/${user?.id}`);
    }
  }, []);

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <Link to={`/studio/create`}>
          <Button>Add Studio</Button>
        </Link>
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
      <StudioTable type={studioType} term={debouncedTerm} />
      <StudioPageList />
    </div>
  );
};

const StudioPageList = () => {
  const { currentPage, setCurrentPage, totalItems } = useStudioPagination();

  return (
    <PageList
      totalItems={totalItems}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
};

interface Props {
  type?: StudioType;
  term?: string;
}

interface StudioPaginationState {
  totalItems: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  setTotalItems: (itemCount: number) => void;
}

const useStudioPagination = create<StudioPaginationState>((set) => ({
  totalItems: 15,
  currentPage: 1,
  setCurrentPage: (pageNumber) => set(() => ({ currentPage: pageNumber })),
  setTotalItems: (itemCount) => set(() => ({ totalItems: itemCount })),
}));

const StudioTable = ({ type, term }: Props) => {
  const { headers } = useAuth();
  const [currentPage, setTotalItems, totalItems] = useStudioPagination(
    useShallow((state) => [
      state.currentPage,
      state.setTotalItems,
      state.totalItems,
    ])
  );
  const [{ data, loading, error }] = useAxios<PaginatedResult<Studio>>(
    {
      url: getUrl("studio"),
      params: {
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
        studioType: type,
        term,
      },
      headers,
    },
    { useCache: false, manual: !headers.Ready }
  );

  useEffect(() => {
    if (data && data.total !== totalItems) {
      setTotalItems(data.total);
    }
  }, [data, totalItems]);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {data.result.map((item) => {
        return (
          <Link
            to={`/studio/${item.id}`}
            key={item.id}
            className="flex gap-2 bg-secondary/50 rounded-md p-2 hover:opacity-80 transition-all duration-200"
          >
            <div className="font-bold">
              {item.name} | {item.type}
            </div>
            <div>{format(item.dateCreated, "yyyy-MM-dd")}</div>
          </Link>
        );
      })}
    </div>
  );
};
