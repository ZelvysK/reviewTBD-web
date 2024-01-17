export interface PaginatedResult<T> {
  limit: number;
  offset: number;
  total: number;
  result: T[];
}

export interface Studio {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  foundedDate: string;
  type: StudioType;
}

export const StudioTypes = ["Anime", "Game", "Movie"] as const;

export type StudioType = (typeof StudioTypes)[number];
