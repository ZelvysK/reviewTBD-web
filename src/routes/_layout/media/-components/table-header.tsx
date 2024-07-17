import { MediaType } from "@/__generated__/graphql";
import { AdminOnly } from "@/components/admin-only";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { useMediaTableStore } from "./use-media-table-store";
import { mediaTypeOptions } from "./types";

export const TableHeader = () => {
  const { term, setTerm, mediaType, setMediaType } = useMediaTableStore(
    (state) => ({
      mediaType: state.mediaType,
      term: state.term,
      setMediaType: state.setMediaType,
      setTerm: state.setTerm,
    }),
  );

  return (
    <div className="flex gap-2">
      <AdminOnly>
        <Link to="/media/create">
          <Button>Add Media</Button>
        </Link>
      </AdminOnly>
      <Input
        type="text"
        value={term ?? ""}
        onChange={(e) => setTerm(e.target.value.trim())}
        placeholder="Search away..."
      />
      <Select
        value={mediaType ?? ""}
        onValueChange={(val) => setMediaType(val as MediaType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by studio type if you want 🫡" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Media type</SelectLabel>
            {mediaTypeOptions.map(({ label, value }) => {
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={() => {
          setTerm(undefined);
          setMediaType(undefined);
        }}
        variant="outline"
      >
        Clear Filters
      </Button>
    </div>
  );
};
