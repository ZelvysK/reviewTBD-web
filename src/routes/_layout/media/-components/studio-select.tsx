import { Controller, useForm } from "react-hook-form";
import { AsyncPaginate } from "react-select-async-paginate";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { cn } from "@/lib/utils";
import { gql } from "@/__generated__";
import { client } from "@/main";
import { ChevronDown } from "lucide-react";

export type OptionType = {
  value: string;
  label: string;
};

type FieldValues = {
  multiple?: OptionType[];
};

export const STUDIOS_OPTIONS_QUERY = gql(/* GraphQL */ `
  query GetStudioOptions($skip: Int, $take: Int, $input: GetStudiosInput!) {
    studios(skip: $skip, take: $take, input: $input) {
      pageInfo {
        hasNextPage
      }
      items {
        id
        name
      }
    }
  }
`);

export const loadOptions = async (
  term: string,
  prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
) => {
  const { data } = await client.query({
    query: STUDIOS_OPTIONS_QUERY,
    variables: {
      skip: prevOptions.length,
      take: 10,
      input: {
        term,
      },
    },
  });

  const hasMore = data?.studios?.pageInfo?.hasNextPage ?? false;

  const options =
    data?.studios?.items?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) ?? ([] satisfies OptionType[]);

  return {
    options,
    hasMore,
  };
};

const controlStyles = {
  base: "border border-border rounded-md bg-background hover:cursor-pointer h-10 pl-0.5 pr-2",
  focus: "border-border ring-ring ring-primary-500",
  nonFocus: "border-border",
};
const placeholderStyles = "text-muted-foreground text-sm pl-3";
const selectInputStyles = "text-foreground text-sm pl-3";
const valueContainerStyles = "text-foreground text-sm";
const singleValueStyles = "ml-1";

const multiValueStyles =
  "ml-1 bg-primary border border-border rounded-full items-center my-0.5 pl-2.5 pr-1.5 py-0.25 gap-2";

const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "size-5 hover:bg-destructive/50 hover:text-black text-white rounded-full bg-destructive flex items-center justify-center transition-colors";
const indicatorsContainerStyles = "p-1 gap-1 bg-background rounded-md";
const clearIndicatorStyles = "text-gray-500 p-1 rounded-md hover:text-red-800";
const indicatorSeparatorStyles = "bg-mutated";
const dropdownIndicatorStyles = "p-12 hover:text-foreground text-gray-500";
const menuStyles =
  "mt-2 p-2 border border-border bg-background text-sm rounded-md";
const optionsStyle =
  "bg-background p-2 border-0 text-base hover:bg-secondary hover:rounded-md hover:cursor-pointer";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background";
const noOptionsMessageStyles = "text-muted-foreground bg-background";

export const StudioSelect = () => {
  const { control } = useForm<FieldValues>();

  return (
    <fieldset>
      <legend>Multiple select</legend>

      <Controller
        control={control}
        name="multiple"
        render={({ field: { value, onChange, ref } }) => (
          <AsyncPaginate
            unstyled
            components={{
              DropdownIndicator: () => (
                <ChevronDown className="h-4 w-4 opacity-50" />
              ),
            }}
            classNames={{
              control: ({ isFocused }) =>
                cn(
                  isFocused ? controlStyles.focus : controlStyles.nonFocus,
                  controlStyles.base,
                ),
              placeholder: () => placeholderStyles,
              input: () => selectInputStyles,
              option: () => optionsStyle,
              menu: () => menuStyles,
              valueContainer: () => valueContainerStyles,
              singleValue: () => singleValueStyles,
              multiValue: () => multiValueStyles,
              multiValueLabel: () => multiValueLabelStyles,
              multiValueRemove: () => multiValueRemoveStyles,
              indicatorsContainer: () => indicatorsContainerStyles,
              clearIndicator: () => clearIndicatorStyles,
              indicatorSeparator: () => indicatorSeparatorStyles,
              dropdownIndicator: () => dropdownIndicatorStyles,
              groupHeading: () => groupHeadingStyles,
              noOptionsMessage: () => noOptionsMessageStyles,
            }}
            isClearable
            isMulti
            debounceTimeout={300}
            value={value}
            loadOptions={loadOptions}
            onChange={onChange}
            selectRef={ref}
          />
        )}
      />
    </fieldset>
  );
};
