export interface Option<T> {
  value: T;
  label: string;
}

export interface Studio {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  headquarters: string;
  founder: string;
  dateCreated: Date;
  type: StudioType;
}

export type NewStudio = Omit<Studio, "id">;

export const StudioTypes = ["Anime", "Game", "Movie"] as const;
export type StudioType = (typeof StudioTypes)[number];

export const StudioOptions: Option<StudioType>[] = StudioTypes.map((item) => ({
  value: item,
  label: item,
}));

export interface Media {
  id: string;
  mediaType: MediaType;
  genre: Genre;
  name: string;
  description: string;
  coverImageUrl: string;
  dateCreated: Date;
  studioId: string;
  studio?: Studio;
  publishedBy: string;
  datePosted: string;
  dateModified: string;
}

export type NewMedia = Omit<Media, "id">;

export const MediaTypes = ["Anime", "Game", "Movie"] as const;
export type MediaType = (typeof MediaTypes)[number];

export const MediaOptions: Option<MediaType>[] = MediaTypes.map((item) => ({
  value: item,
  label: item,
}));

export interface PaginatedResult<T> {
  limit: number;
  offset: number;
  total: number;
  result: T[];
}

export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: RoleType;
}

export const RoleTypes = ["User", "Admin"] as const;
export type RoleType = (typeof RoleTypes)[number];
export const RoleOptions: Option<RoleType>[] = RoleTypes.map((item) => ({
  value: item,
  label: item,
}));

export const Genres = [
  "Action",
  "Adventure",
  "Animation",
  "Arcade",
  "Comedy",
  "Crime",
  "Cyberpunk",
  "DeathGame",
  "Drama",
  "Fantasy",
  "Historical",
  "Horror",
  "Mystery",
  "Romance",
  "RolePlaying",
  "Satire",
  "ScienceFiction",
  "Simulation",
  "Strategy",
  "Speculative",
  "Thriller",
  "Isekai",
  "Western",
] as const;
export type Genre = (typeof Genres)[number];
export const GenreOptions: Option<Genre>[] = Genres.map((item) => ({
  value: item,
  label: item,
}));
