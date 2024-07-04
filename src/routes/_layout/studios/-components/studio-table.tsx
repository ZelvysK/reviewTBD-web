import { gql } from "@/__generated__";
import { PAGE_SIZE } from "@/api";
import { Loader } from "@/components/loader";
import { useQuery } from "@apollo/client";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { useShallow } from "zustand/react/shallow";
import { useStudioTableStore } from "./use-studio-table-store";

const STUDIOS_QUERY = gql(/* GraphQL */ `
  query GetStudios($skip: Int, $take: Int, $input: GetStudiosInput!) {
    studios(skip: $skip, take: $take, input: $input) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        name
        description
        imageUrl
        headquarters
        founder
        studioType
        dateEstablished
      }
      totalCount
    }
  }
`);

interface Props {
  term?: string;
}

export const StudioTable = ({ term }: Props) => {
  const [pageNumber, setPageInfo, studioType] = useStudioTableStore(
    useShallow((state) => [
      state.pageNumber,
      state.setPageInfo,
      state.studioType,
    ]),
  );
  const { data, error, loading } = useQuery(STUDIOS_QUERY, {
    variables: {
      skip: (pageNumber - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      input: {
        term,
        studioType,
      },
    },
    onCompleted(data) {
      if (data?.studios) {
        setPageInfo({
          ...data.studios.pageInfo,
          totalCount: data.studios.totalCount,
        });
      }
    },
  });

  const studios = data?.studios?.items;

  if (error) {
    throw new Error(error.message);
  }

  if (!studios || loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {studios.map((item) => {
        return (
          <Link
            to={`/studio/${item.id}`}
            key={item.id}
            className="flex gap-2 bg-secondary/50 rounded-md p-2 hover:opacity-80 transition-all duration-200"
          >
            <div className="font-bold">
              {item.name} | {item.studioType}
            </div>
            <div>{format(item.dateEstablished, "yyyy-MM-dd")}</div>
          </Link>
        );
      })}
    </div>
  );
};
