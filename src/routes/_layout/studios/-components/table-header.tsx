import { StudioType } from "@/__generated__/graphql";
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
import { useStudioTableStore } from "./use-studio-table-store";

export const TableHeader = () => {
  const { term, setTerm, studioType, setStudioType } = useStudioTableStore(
    (state) => ({
      studioType: state.studioType,
      term: state.term,
      setStudioType: state.setStudioType,
      setTerm: state.setTerm,
    }),
  );

  const studioTypeOptions = Object.entries(StudioType).map(
    ([label, value]) => ({
      label,
      value,
    }),
  );

  return (
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
            {studioTypeOptions.map(({ label, value }) => {
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
          setStudioType(undefined);
        }}
        variant="outline"
      >
        Clear Filters
      </Button>
    </div>
  );
};
