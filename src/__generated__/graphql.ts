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
};

export type Deal = {
  __typename?: 'Deal';
  deals: Array<GetDealsOffer>;
  lastRefresh: Scalars['String']['output'];
};

export type GetDealsOffer = {
  __typename?: 'GetDealsOffer';
  count: Scalars['Int']['output'];
  creationDateUtc: Scalars['String']['output'];
  dealUuid: Scalars['String']['output'];
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  offerPropositionId: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  shortName: Scalars['String']['output'];
  validFromUtc: Scalars['String']['output'];
  validToUtc: Scalars['String']['output'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  deal: Deal;
  user: User;
};

export type User = {
  __typename?: 'User';
  config: UserOptions;
  id: Scalars['String']['output'];
  role: UserRole;
};

export type UserOptions = {
  __typename?: 'UserOptions';
  storeId: Scalars['String']['output'];
  storeName?: Maybe<Scalars['String']['output']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  None = 'NONE',
  Privileged = 'PRIVILEGED'
}

export type IndexQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexQuery = { __typename?: 'QueryRoot', user: { __typename?: 'User', id: string, role: UserRole, config: { __typename?: 'UserOptions', storeName?: string | null, storeId: string } }, deal: { __typename?: 'Deal', lastRefresh: string, deals: Array<{ __typename?: 'GetDealsOffer', dealUuid: string, imageUrl: string, offerPropositionId: string, count: number, shortName: string, name: string, validFromUtc: string, validToUtc: string }> } };


export const IndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Index"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"config"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storeName"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"deal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastRefresh"}},{"kind":"Field","name":{"kind":"Name","value":"deals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dealUuid"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"offerPropositionId"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"validFromUtc"}},{"kind":"Field","name":{"kind":"Name","value":"validToUtc"}}]}}]}}]}}]} as unknown as DocumentNode<IndexQuery, IndexQueryVariables>;