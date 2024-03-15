import { useDebounce } from "@/hooks/use-debounce";
import useAxios from "axios-hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_SIZE } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { PaginatedResult, Studio, StudioType, StudioTypes } from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageList } from "../pagination";

export const StudioList = () => {
  const [term, setTerm] = useState<string>();
  const debouncedTerm = useDebounce(term);
  const [studioType, setStudioType] = useState<StudioType>();

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
            <SelectValue placeholder="Select studio type" />
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
    </div>
  );
};

interface Props {
  type?: StudioType;
  term?: string;
}

const StudioTable = ({ type, term }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { headers } = useAuth();
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
          <Link to={`/studio/${item.id}`} key={item.id} className="flex gap-2">
            <div className="font-bold">
              {item.name} | {item.type}
            </div>
            <div>{item.dateCreated}</div>
          </Link>
        );
      })}
      <PageList
        totalItems={data.total}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
