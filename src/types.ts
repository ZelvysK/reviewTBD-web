export interface Option<T> {
  value: T;
  label: string;
}

export interface Studio {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateCreated: string;
  type: StudioType;
}

export const StudioTypes = ["Anime", "Game", "Movie"] as const;
export type StudioType = (typeof StudioTypes)[number];

export interface PaginatedResult<T> {
  limit: number;
  offset: number;
  total: number;
  result: T[];
}

export interface Anime {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  animeStudioId: string;
  dateCreated: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  dateCreated: string;
  gameCreatorId: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  dateCreated: string;
  movieStudioId: string;
}
