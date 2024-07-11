/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: { input: Date; output: Date; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type AuthData = {
  __typename?: 'AuthData';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type CreateMediaInput = {
  coverImageUrl?: InputMaybe<Scalars['String']['input']>;
  dateFounded: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  genre: Genre;
  mediaType: MediaType;
  name: Scalars['String']['input'];
  studioId: Scalars['UUID']['input'];
};

export type CreateMediaPayload = {
  __typename?: 'CreateMediaPayload';
  media?: Maybe<Media>;
};

export type CreateStudioInput = {
  dateEstablished: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  founder: Scalars['String']['input'];
  headquarters: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  studioType: StudioType;
};

export type CreateStudioPayload = {
  __typename?: 'CreateStudioPayload';
  studio?: Maybe<Studio>;
};

export type DeleteMediaInput = {
  id: Scalars['UUID']['input'];
};

export type DeleteMediaPayload = {
  __typename?: 'DeleteMediaPayload';
  media?: Maybe<Media>;
};

export type DeleteStudioInput = {
  id: Scalars['UUID']['input'];
};

export type DeleteStudioPayload = {
  __typename?: 'DeleteStudioPayload';
  studio?: Maybe<Studio>;
};

export enum Genre {
  Action = 'ACTION',
  Adventure = 'ADVENTURE',
  Animation = 'ANIMATION',
  Arcade = 'ARCADE',
  Comedy = 'COMEDY',
  Crime = 'CRIME',
  Cyberpunk = 'CYBERPUNK',
  DeathGame = 'DEATH_GAME',
  Drama = 'DRAMA',
  Fantasy = 'FANTASY',
  Historical = 'HISTORICAL',
  Horror = 'HORROR',
  Isekai = 'ISEKAI',
  Mystery = 'MYSTERY',
  RolePlaying = 'ROLE_PLAYING',
  Romance = 'ROMANCE',
  Satire = 'SATIRE',
  ScienceFiction = 'SCIENCE_FICTION',
  Simulation = 'SIMULATION',
  Speculative = 'SPECULATIVE',
  Strategy = 'STRATEGY',
  Thriller = 'THRILLER',
  Western = 'WESTERN'
}

export type GetStudiosInput = {
  studioType?: InputMaybe<StudioType>;
  term?: InputMaybe<Scalars['String']['input']>;
};

export type Media = {
  __typename?: 'Media';
  coverImageUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  dateFounded: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genre: Genre;
  id: Scalars['UUID']['output'];
  mediaType: MediaType;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  studioId: Scalars['UUID']['output'];
};

/** A segment of a collection. */
export type MediaCollectionSegment = {
  __typename?: 'MediaCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Media>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export enum MediaType {
  Anime = 'ANIME',
  Game = 'GAME',
  Movie = 'MOVIE'
}

export type Mutation = {
  __typename?: 'Mutation';
  createMedia: CreateMediaPayload;
  createStudio: CreateStudioPayload;
  deleteMedia: DeleteMediaPayload;
  deleteStudio: DeleteStudioPayload;
  signIn: SignInPayload;
  signUp: SignUpPayload;
  updateMedia: UpdateMediaPayload;
  updateStudio: UpdateStudioPayload;
};


export type MutationCreateMediaArgs = {
  input: CreateMediaInput;
};


export type MutationCreateStudioArgs = {
  input: CreateStudioInput;
};


export type MutationDeleteMediaArgs = {
  input: DeleteMediaInput;
};


export type MutationDeleteStudioArgs = {
  input: DeleteStudioInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateMediaArgs = {
  input: UpdateMediaInput;
};


export type MutationUpdateStudioArgs = {
  input: UpdateStudioInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  media?: Maybe<MediaCollectionSegment>;
  studioById?: Maybe<Studio>;
  studios?: Maybe<StudiosCollectionSegment>;
};


export type QueryMediaArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStudioByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryStudiosArgs = {
  input: GetStudiosInput;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  auth?: Maybe<AuthData>;
};

export type SignUpInput = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  auth?: Maybe<AuthData>;
};

export type Studio = {
  __typename?: 'Studio';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  dateEstablished: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  founder: Scalars['String']['output'];
  headquarters: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  studioType: StudioType;
};

export enum StudioType {
  Anime = 'ANIME',
  Game = 'GAME',
  Movie = 'MOVIE'
}

/** A segment of a collection. */
export type StudiosCollectionSegment = {
  __typename?: 'StudiosCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Studio>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UpdateMediaInput = {
  coverImageUrl: Scalars['String']['input'];
  dateFounded: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  genre: Genre;
  id: Scalars['UUID']['input'];
  mediaType: MediaType;
  name: Scalars['String']['input'];
  publishedBy: Scalars['String']['input'];
  studioId: Scalars['UUID']['input'];
};

export type UpdateMediaPayload = {
  __typename?: 'UpdateMediaPayload';
  media?: Maybe<Media>;
};

export type UpdateStudioInput = {
  dateEstablished: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  founder: Scalars['String']['input'];
  headquarters: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  studioType: StudioType;
};

export type UpdateStudioPayload = {
  __typename?: 'UpdateStudioPayload';
  studio?: Maybe<Studio>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  remoteId: Scalars['String']['output'];
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInPayload', auth?: { __typename?: 'AuthData', token: string, refreshToken: string } | null } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpPayload', auth?: { __typename?: 'AuthData', token: string, refreshToken: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: any, name: string, email: string, role: UserRole } };

export type UpdateStudioMutationVariables = Exact<{
  input: UpdateStudioInput;
}>;


export type UpdateStudioMutation = { __typename?: 'Mutation', updateStudio: { __typename?: 'UpdateStudioPayload', studio?: { __typename?: 'Studio', id: any } | null } };

export type DeleteStudioMutationVariables = Exact<{
  input: DeleteStudioInput;
}>;


export type DeleteStudioMutation = { __typename?: 'Mutation', deleteStudio: { __typename?: 'DeleteStudioPayload', studio?: { __typename?: 'Studio', id: any } | null } };

export type GetStudiosQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  input: GetStudiosInput;
}>;


export type GetStudiosQuery = { __typename?: 'Query', studios?: { __typename?: 'StudiosCollectionSegment', totalCount: number, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean }, items?: Array<{ __typename?: 'Studio', id: any, name: string, studioType: StudioType, dateEstablished: Date }> | null } | null };

export type GetStudioByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetStudioByIdQuery = { __typename?: 'Query', studioById?: { __typename?: 'Studio', id: any, name: string, description?: string | null, imageUrl?: string | null, headquarters: string, founder: string, studioType: StudioType, dateEstablished: Date } | null };

export type CreateStudioMutationVariables = Exact<{
  input: CreateStudioInput;
}>;


export type CreateStudioMutation = { __typename?: 'Mutation', createStudio: { __typename?: 'CreateStudioPayload', studio?: { __typename?: 'Studio', id: any } | null } };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UpdateStudioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateStudioMutation, UpdateStudioMutationVariables>;
export const DeleteStudioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteStudioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteStudioMutation, DeleteStudioMutationVariables>;
export const GetStudiosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudios"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetStudiosInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studios"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"studioType"}},{"kind":"Field","name":{"kind":"Name","value":"dateEstablished"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetStudiosQuery, GetStudiosQueryVariables>;
export const GetStudioByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudioById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studioById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"headquarters"}},{"kind":"Field","name":{"kind":"Name","value":"founder"}},{"kind":"Field","name":{"kind":"Name","value":"studioType"}},{"kind":"Field","name":{"kind":"Name","value":"dateEstablished"}}]}}]}}]} as unknown as DocumentNode<GetStudioByIdQuery, GetStudioByIdQueryVariables>;
export const CreateStudioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStudioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateStudioMutation, CreateStudioMutationVariables>;