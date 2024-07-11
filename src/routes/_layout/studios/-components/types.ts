import { gql } from "@/__generated__";
import { StudioType } from "@/__generated__/graphql";

export const studioTypeOptions = Object.entries(StudioType).map(
  ([label, value]) => ({
    label,
    value,
  }),
);

export const STUDIO_BY_ID_QUERY = gql(/* GraphQL */ `
  query GetStudioById($id: UUID!) {
    studioById(id: $id) {
      id
      name
      description
      imageUrl
      headquarters
      founder
      studioType
      dateEstablished
    }
  }
`);
