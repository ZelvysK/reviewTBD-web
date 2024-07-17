import { gql } from "@/__generated__";
import { Genre, MediaType } from "@/__generated__/graphql";

export const mediaTypeOptions = Object.entries(MediaType).map(
  ([label, value]) => ({
    label,
    value,
  }),
);

export const genreOptions = Object.entries(Genre).map(([label, value]) => ({
  label,
  value,
}));

export const MEDIA_BY_ID_QUERY = gql(/* GraphQL */ `
  query GetMediaById($id: UUID!) {
    mediaById(id: $id) {
      id
      name
      description
      coverImageUrl
      genre
      mediaType
      studioId
      dateEstablished
    }
  }
`);
