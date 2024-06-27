/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      auth {\n        token\n        refreshToken\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      auth {\n        token\n        refreshToken\n      }\n    }\n  }\n": types.SignUpDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n      role\n    }\n  }\n": types.MeDocument,
    "\n  query GetStudios($skip: Int, $take: Int) {\n    studios(skip: $skip, take: $take) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n      items {\n        id\n        name\n        description\n        imageUrl\n        headquarters\n        founder\n        studioType\n        dateEstablished\n      }\n    }\n  }\n": types.GetStudiosDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      auth {\n        token\n        refreshToken\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      auth {\n        token\n        refreshToken\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      auth {\n        token\n        refreshToken\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      auth {\n        token\n        refreshToken\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      name\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      email\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStudios($skip: Int, $take: Int) {\n    studios(skip: $skip, take: $take) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n      items {\n        id\n        name\n        description\n        imageUrl\n        headquarters\n        founder\n        studioType\n        dateEstablished\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStudios($skip: Int, $take: Int) {\n    studios(skip: $skip, take: $take) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n      items {\n        id\n        name\n        description\n        imageUrl\n        headquarters\n        founder\n        studioType\n        dateEstablished\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;