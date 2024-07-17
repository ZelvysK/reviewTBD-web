import { gql } from "@/__generated__";
import { useMediaTableStore } from "./use-media-table-store";
import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@apollo/client";
import { PAGE_SIZE } from "@/api";
import { Loader } from "@/components/loader";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";

export const MEDIA_QUERY = gql(/* GraphQL */ `
  query GetMedia($skip: Int, $take: Int, $input: GetMediaInput!) {
    media(skip: $skip, take: $take, input: $input) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        mediaType
        genre
        name
        dateEstablished
      }
      totalCount
    }
  }
`);

interface Props {
  term?: string;
}

export const MediaTable = ({ term }: Props) => {
  const [pageNumber, setPageInfo, mediaType] = useMediaTableStore(
    useShallow((state) => [
      state.pageNumber,
      state.setPageInfo,
      state.mediaType,
    ]),
  );
  const { data, error, loading } = useQuery(MEDIA_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      skip: (pageNumber - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      input: {
        term,
        mediaType,
      },
    },
    onCompleted(data) {
      if (data?.media) {
        setPageInfo({
          ...data.media.pageInfo,
          totalCount: data.media.totalCount,
        });
      }
    },
  });

  const media = data?.media?.items;

  if (error) {
    throw new Error(error.message);
  }

  if (!media || loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {media.map((item) => {
        return (
          <Link
            to="/media/$mediaId"
            params={{ mediaId: item.id }}
            key={item.id}
            className="flex gap-2 bg-secondary/50 rounded-md p-2 hover:opacity-80 transition-all duration-200"
          >
            <div className="font-bold">
              {item.name} | {item.mediaType}
            </div>
            <div>{format(item.dateEstablished, "yyyy-MM-dd")}</div>
          </Link>
        );
      })}
    </div>
  );
};
