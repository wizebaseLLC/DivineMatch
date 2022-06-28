import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: Date;
  UUID: string;
};

export type InputUser = {
  about: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  age: Scalars['Int'];
  gender: Scalars['String'];
  location: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  lookingfor: Scalars['String'];
  preference: Scalars['String'];
  profilepic: Scalars['String'];
  gallery1?: Maybe<Scalars['String']>;
  gallery2?: Maybe<Scalars['String']>;
  gallery3?: Maybe<Scalars['String']>;
  gallery4?: Maybe<Scalars['String']>;
  interest: Array<Scalars['String']>;
  spirituality: Array<Scalars['String']>;
};

export type LikeView = {
  __typename?: 'LikeView';
  userId: Scalars['ID'];
  recipientId: Scalars['String'];
  likeId: Scalars['String'];
  isDivine: Scalars['Boolean'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  location: Scalars['String'];
  profilepic: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LikeWithMatchCheck = {
  __typename?: 'LikeWithMatchCheck';
  id: Scalars['ID'];
  userId: Scalars['String'];
  recipientId: Scalars['String'];
  isDivine: Scalars['Boolean'];
  isMatch: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  createUser: User;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
  createLike?: Maybe<LikeWithMatchCheck>;
  updateTimestamp: Scalars['Boolean'];
  updateLike: UpdateLikeData;
  deleteLikeById: Scalars['Boolean'];
  deleteLikeByUserRecipient: Scalars['Boolean'];
  createPost: Scalars['UUID'];
  createPostLike: Scalars['Boolean'];
  markPostInactive: Scalars['Boolean'];
  markPostCommentInactive: Scalars['Boolean'];
  createPostComment: Scalars['UUID'];
  createPostCommentReply: Scalars['UUID'];
  markPostCommentRepliesInactive: Scalars['Boolean'];
};

export type MutationRootCreateUserArgs = {
  input: InputUser;
};

export type MutationRootUpdateUserArgs = {
  id: Scalars['ID'];
  input: InputUser;
};

export type MutationRootDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationRootCreateLikeArgs = {
  input: NewLikeInput;
};

export type MutationRootUpdateTimestampArgs = {
  id: Scalars['ID'];
};

export type MutationRootUpdateLikeArgs = {
  input: NewLikeInput;
};

export type MutationRootDeleteLikeByIdArgs = {
  id: Scalars['ID'];
};

export type MutationRootDeleteLikeByUserRecipientArgs = {
  userId: Scalars['ID'];
  recipientId: Scalars['String'];
};

export type MutationRootCreatePostArgs = {
  input: PostInput;
};

export type MutationRootCreatePostLikeArgs = {
  input: PostLikeInput;
};

export type MutationRootMarkPostInactiveArgs = {
  postId: Scalars['ID'];
};

export type MutationRootMarkPostCommentInactiveArgs = {
  postId: Scalars['ID'];
};

export type MutationRootCreatePostCommentArgs = {
  input: PostCommentInput;
};

export type MutationRootCreatePostCommentReplyArgs = {
  input: PostCommentRepliesInput;
};

export type MutationRootMarkPostCommentRepliesInactiveArgs = {
  postId: Scalars['ID'];
};

export enum MutationType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED',
}

export type NewLikeInput = {
  userId: Scalars['String'];
  recipientId: Scalars['String'];
  isDivine: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  userId: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  media?: Maybe<PostMedia>;
  tags?: Maybe<Array<Scalars['String']>>;
  flair?: Maybe<Scalars['String']>;
  flairText?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  location: Scalars['String'];
  profilepic: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostComment = {
  __typename?: 'PostComment';
  id: Scalars['ID'];
  userId: Scalars['String'];
  postId: Scalars['String'];
  active: Scalars['Boolean'];
  body?: Maybe<Scalars['String']>;
  media?: Maybe<Array<PostMedia>>;
  tags?: Maybe<Array<Scalars['String']>>;
  flair?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostCommentInput = {
  userId: Scalars['String'];
  postId: Scalars['String'];
  active: Scalars['Boolean'];
  body?: Maybe<Scalars['String']>;
  media?: Maybe<Array<PostMediaInput>>;
  tags?: Maybe<Array<Scalars['String']>>;
  flair?: Maybe<Scalars['String']>;
  hashtags?: Maybe<Array<Scalars['String']>>;
};

export type PostCommentRepliesInput = {
  userId: Scalars['String'];
  postCommentId: Scalars['String'];
  active: Scalars['Boolean'];
  body?: Maybe<Scalars['String']>;
  media?: Maybe<Array<PostMediaInput>>;
  tags?: Maybe<Array<Scalars['String']>>;
  flair?: Maybe<Scalars['String']>;
  hashtags?: Maybe<Array<Scalars['String']>>;
};

export type PostCommentReply = {
  __typename?: 'PostCommentReply';
  id: Scalars['ID'];
  userId: Scalars['String'];
  postCommentId: Scalars['String'];
  active: Scalars['Boolean'];
  body?: Maybe<Scalars['String']>;
  media?: Maybe<Array<PostMedia>>;
  tags?: Maybe<Array<Scalars['String']>>;
  flair?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostInput = {
  userId: Scalars['String'];
  active: Scalars['Boolean'];
  body?: Maybe<Scalars['String']>;
  media?: Maybe<PostMediaInput>;
  tags?: Maybe<Array<Scalars['String']>>;
  flair?: Maybe<Scalars['String']>;
  flairText?: Maybe<Scalars['String']>;
  hashtags?: Maybe<Array<Scalars['String']>>;
};

export type PostLike = {
  __typename?: 'PostLike';
  id: Scalars['ID'];
  userId: Scalars['String'];
  postId: Scalars['String'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type PostLikeInput = {
  userId: Scalars['String'];
  postId: Scalars['String'];
  active?: Maybe<Scalars['Boolean']>;
};

export type PostMedia = {
  __typename?: 'PostMedia';
  uri: Scalars['String'];
  mediaType: Scalars['String'];
};

export type PostMediaInput = {
  uri: Scalars['String'];
  mediaType: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  currentToken?: Maybe<Scalars['String']>;
  listUsersDeckSwiper: Array<UserLimitedFields>;
  getUser: User;
  listUsersById: Array<User>;
  listUsersByName: Array<UserNameList>;
  getDistance: UserDistance;
  myProfile?: Maybe<User>;
  iLikeYou: LikeView;
  findManyPost: Array<Post>;
  findPost: Post;
  findCommentsWithPostId: Array<PostComment>;
  findRepliesWithCommentId: Array<PostCommentReply>;
  findLikesByPost: Array<PostLike>;
  findLikesByUser: Array<PostLike>;
};

export type QueryRootListUsersDeckSwiperArgs = {
  maxDistance: Scalars['Float'];
};

export type QueryRootGetUserArgs = {
  id: Scalars['ID'];
};

export type QueryRootListUsersByIdArgs = {
  ids: Array<Scalars['String']>;
};

export type QueryRootListUsersByNameArgs = {
  name: Scalars['ID'];
};

export type QueryRootGetDistanceArgs = {
  userId: Scalars['ID'];
  recipientId: Scalars['String'];
};

export type QueryRootILikeYouArgs = {
  userId: Scalars['ID'];
  recipientId: Scalars['String'];
};

export type QueryRootFindPostArgs = {
  id: Scalars['ID'];
};

export type QueryRootFindCommentsWithPostIdArgs = {
  postId: Scalars['ID'];
};

export type QueryRootFindRepliesWithCommentIdArgs = {
  id: Scalars['ID'];
};

export type QueryRootFindLikesByPostArgs = {
  id: Scalars['ID'];
};

export type QueryRootFindLikesByUserArgs = {
  id: Scalars['ID'];
};

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  interval: Scalars['Int'];
  userUpdated: UserChanged;
};

export type SubscriptionRootIntervalArgs = {
  n?: Scalars['Int'];
};

export type SubscriptionRootUserUpdatedArgs = {
  mutationType?: Maybe<MutationType>;
  id: Scalars['ID'];
};

export type UpdateLikeData = {
  __typename?: 'UpdateLikeData';
  userId: Scalars['ID'];
  recipientId: Scalars['String'];
  isDivine: Scalars['Boolean'];
  isMatch: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  about: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  age: Scalars['Int'];
  gender: Scalars['String'];
  location: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  lookingfor: Scalars['String'];
  preference: Scalars['String'];
  profilepic: Scalars['String'];
  gallery1?: Maybe<Scalars['String']>;
  gallery2?: Maybe<Scalars['String']>;
  gallery3?: Maybe<Scalars['String']>;
  gallery4?: Maybe<Scalars['String']>;
  interest: Array<Scalars['String']>;
  spirituality: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserChanged = {
  __typename?: 'UserChanged';
  mutationType: MutationType;
  id: Scalars['ID'];
};

export type UserDistance = {
  __typename?: 'UserDistance';
  distance?: Maybe<Scalars['Float']>;
};

export type UserLimitedFields = {
  __typename?: 'UserLimitedFields';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  location: Scalars['String'];
  profilepic: Scalars['String'];
  distance?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type UserNameList = {
  __typename?: 'UserNameList';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  profilepic: Scalars['String'];
};

export type CreateLikeMutationVariables = Exact<{
  input: NewLikeInput;
}>;

export type CreateLikeMutation = { __typename?: 'MutationRoot' } & {
  createLike?: Maybe<
    { __typename?: 'LikeWithMatchCheck' } & Pick<
      LikeWithMatchCheck,
      | 'id'
      | 'userId'
      | 'recipientId'
      | 'isDivine'
      | 'isMatch'
      | 'createdAt'
      | 'updatedAt'
    >
  >;
};

export type DeleteLikeByUserRecipientMutationVariables = Exact<{
  userId: Scalars['ID'];
  recipientId: Scalars['String'];
}>;

export type DeleteLikeByUserRecipientMutation = {
  __typename?: 'MutationRoot';
} & Pick<MutationRoot, 'deleteLikeByUserRecipient'>;

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;

export type CreatePostMutation = { __typename?: 'MutationRoot' } & Pick<
  MutationRoot,
  'createPost'
>;

export type CreatePostLikeMutationVariables = Exact<{
  input: PostLikeInput;
}>;

export type CreatePostLikeMutation = { __typename?: 'MutationRoot' } & Pick<
  MutationRoot,
  'createPostLike'
>;

export type MarkPostInactiveMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type MarkPostInactiveMutation = { __typename?: 'MutationRoot' } & Pick<
  MutationRoot,
  'markPostInactive'
>;

export type MarkPostCommentInactiveMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type MarkPostCommentInactiveMutation = {
  __typename?: 'MutationRoot';
} & Pick<MutationRoot, 'markPostCommentInactive'>;

export type MarkPostCommentReplyInactiveMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type MarkPostCommentReplyInactiveMutation = {
  __typename?: 'MutationRoot';
} & Pick<MutationRoot, 'markPostCommentRepliesInactive'>;

export type CreatePostCommentMutationVariables = Exact<{
  input: PostCommentInput;
}>;

export type CreatePostCommentMutation = { __typename?: 'MutationRoot' } & Pick<
  MutationRoot,
  'createPostComment'
>;

export type CreatePostCommentReplyMutationVariables = Exact<{
  input: PostCommentRepliesInput;
}>;

export type CreatePostCommentReplyMutation = {
  __typename?: 'MutationRoot';
} & Pick<MutationRoot, 'createPostCommentReply'>;

export type CreateUserMutationVariables = Exact<{
  input: InputUser;
}>;

export type CreateUserMutation = { __typename?: 'MutationRoot' } & {
  createUser: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'about'
    | 'firstname'
    | 'lastname'
    | 'email'
    | 'age'
    | 'gender'
    | 'location'
    | 'latitude'
    | 'longitude'
    | 'lookingfor'
    | 'preference'
    | 'profilepic'
    | 'gallery1'
    | 'gallery2'
    | 'gallery3'
    | 'gallery4'
    | 'interest'
    | 'spirituality'
    | 'createdAt'
    | 'updatedAt'
  >;
};

export type UpdateUserMutationVariables = Exact<{
  input: InputUser;
  id: Scalars['ID'];
}>;

export type UpdateUserMutation = { __typename?: 'MutationRoot' } & {
  updateUser: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'about'
    | 'firstname'
    | 'lastname'
    | 'email'
    | 'age'
    | 'gender'
    | 'location'
    | 'latitude'
    | 'longitude'
    | 'lookingfor'
    | 'preference'
    | 'profilepic'
    | 'gallery1'
    | 'gallery2'
    | 'gallery3'
    | 'gallery4'
    | 'interest'
    | 'spirituality'
    | 'createdAt'
    | 'updatedAt'
  >;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteUserMutation = { __typename?: 'MutationRoot' } & Pick<
  MutationRoot,
  'deleteUser'
>;

export type UpdateUserTimeStampMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type UpdateUserTimeStampMutation = {
  __typename?: 'MutationRoot';
} & Pick<MutationRoot, 'updateTimestamp'>;

export type ListUsersByIdQueryVariables = Exact<{
  ids: Array<Scalars['String']>;
}>;

export type ListUsersByIdQuery = { __typename?: 'QueryRoot' } & {
  listUsersById: Array<
    { __typename?: 'User' } & Pick<
      User,
      'id' | 'firstname' | 'lastname' | 'profilepic'
    >
  >;
};

export type ILikeYouQueryVariables = Exact<{
  userId: Scalars['ID'];
  recipientId: Scalars['String'];
}>;

export type ILikeYouQuery = { __typename?: 'QueryRoot' } & {
  iLikeYou: { __typename?: 'LikeView' } & Pick<
    LikeView,
    | 'userId'
    | 'recipientId'
    | 'likeId'
    | 'isDivine'
    | 'firstname'
    | 'lastname'
    | 'location'
    | 'profilepic'
    | 'updatedAt'
  >;
};

export type FindPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FindPostQuery = { __typename?: 'QueryRoot' } & {
  findPost: { __typename?: 'Post' } & Pick<
    Post,
    | 'id'
    | 'userId'
    | 'body'
    | 'active'
    | 'firstname'
    | 'lastname'
    | 'location'
    | 'profilepic'
    | 'tags'
    | 'flair'
    | 'flairText'
    | 'createdAt'
    | 'updatedAt'
  > & {
      media?: Maybe<
        { __typename?: 'PostMedia' } & Pick<PostMedia, 'uri' | 'mediaType'>
      >;
    };
};

export type ListPostQueryVariables = Exact<{ [key: string]: never }>;

export type ListPostQuery = { __typename?: 'QueryRoot' } & {
  findManyPost: Array<
    { __typename?: 'Post' } & Pick<
      Post,
      | 'id'
      | 'userId'
      | 'body'
      | 'active'
      | 'firstname'
      | 'lastname'
      | 'location'
      | 'profilepic'
      | 'tags'
      | 'flair'
      | 'flairText'
      | 'createdAt'
      | 'updatedAt'
    > & {
        media?: Maybe<
          { __typename?: 'PostMedia' } & Pick<PostMedia, 'uri' | 'mediaType'>
        >;
      }
  >;
};

export type FindCommentsWithPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FindCommentsWithPostQuery = { __typename?: 'QueryRoot' } & {
  findCommentsWithPostId: Array<
    { __typename?: 'PostComment' } & Pick<
      PostComment,
      | 'id'
      | 'userId'
      | 'postId'
      | 'body'
      | 'active'
      | 'tags'
      | 'flair'
      | 'createdAt'
      | 'updatedAt'
    > & {
        media?: Maybe<
          Array<
            { __typename?: 'PostMedia' } & Pick<PostMedia, 'uri' | 'mediaType'>
          >
        >;
      }
  >;
};

export type FindRepliesWithCommentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FindRepliesWithCommentQuery = { __typename?: 'QueryRoot' } & {
  findRepliesWithCommentId: Array<
    { __typename?: 'PostCommentReply' } & Pick<
      PostCommentReply,
      | 'id'
      | 'userId'
      | 'postCommentId'
      | 'body'
      | 'active'
      | 'tags'
      | 'flair'
      | 'createdAt'
      | 'updatedAt'
    > & {
        media?: Maybe<
          Array<
            { __typename?: 'PostMedia' } & Pick<PostMedia, 'uri' | 'mediaType'>
          >
        >;
      }
  >;
};

export type FindLikesByPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FindLikesByPostQuery = { __typename?: 'QueryRoot' } & {
  findLikesByPost: Array<
    { __typename?: 'PostLike' } & Pick<
      PostLike,
      'id' | 'userId' | 'postId' | 'createdAt'
    >
  >;
};

export type FindLikesByUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FindLikesByUserQuery = { __typename?: 'QueryRoot' } & {
  findLikesByUser: Array<
    { __typename?: 'PostLike' } & Pick<
      PostLike,
      'id' | 'userId' | 'postId' | 'createdAt'
    >
  >;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetUserQuery = { __typename?: 'QueryRoot' } & {
  getUser: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'about'
    | 'firstname'
    | 'lastname'
    | 'email'
    | 'age'
    | 'gender'
    | 'location'
    | 'latitude'
    | 'longitude'
    | 'lookingfor'
    | 'preference'
    | 'profilepic'
    | 'gallery1'
    | 'gallery2'
    | 'gallery3'
    | 'gallery4'
    | 'interest'
    | 'spirituality'
    | 'createdAt'
    | 'updatedAt'
  >;
};

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type MyProfileQuery = { __typename?: 'QueryRoot' } & {
  myProfile?: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      | 'id'
      | 'about'
      | 'firstname'
      | 'lastname'
      | 'email'
      | 'age'
      | 'gender'
      | 'location'
      | 'latitude'
      | 'longitude'
      | 'lookingfor'
      | 'preference'
      | 'profilepic'
      | 'gallery1'
      | 'gallery2'
      | 'gallery3'
      | 'gallery4'
      | 'interest'
      | 'spirituality'
      | 'createdAt'
      | 'updatedAt'
    >
  >;
};

export type ListUserQueryVariables = Exact<{
  maxDistance: Scalars['Float'];
}>;

export type ListUserQuery = { __typename?: 'QueryRoot' } & {
  listUsersDeckSwiper: Array<
    { __typename?: 'UserLimitedFields' } & Pick<
      UserLimitedFields,
      | 'id'
      | 'firstname'
      | 'lastname'
      | 'location'
      | 'profilepic'
      | 'distance'
      | 'updatedAt'
    >
  >;
};

export type ListUserByNameQueryVariables = Exact<{
  name: Scalars['ID'];
}>;

export type ListUserByNameQuery = { __typename?: 'QueryRoot' } & {
  listUsersByName: Array<
    { __typename?: 'UserNameList' } & Pick<
      UserNameList,
      'id' | 'firstname' | 'lastname' | 'profilepic'
    >
  >;
};

export type UserChangeSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;

export type UserChangeSubscription = { __typename?: 'SubscriptionRoot' } & {
  userUpdated: { __typename?: 'UserChanged' } & Pick<
    UserChanged,
    'mutationType' | 'id'
  >;
};

export const CreateLikeDocument = gql`
  mutation CreateLike($input: NewLikeInput!) {
    createLike(input: $input) {
      id
      userId
      recipientId
      isDivine
      isMatch
      createdAt
      updatedAt
    }
  }
`;
export type CreateLikeMutationFn = ApolloReactCommon.MutationFunction<
  CreateLikeMutation,
  CreateLikeMutationVariables
>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLikeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(CreateLikeDocument, baseOptions);
}
export type CreateLikeMutationHookResult = ReturnType<
  typeof useCreateLikeMutation
>;
export type CreateLikeMutationResult = ApolloReactCommon.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateLikeMutation,
  CreateLikeMutationVariables
>;
export const DeleteLikeByUserRecipientDocument = gql`
  mutation DeleteLikeByUserRecipient($userId: ID!, $recipientId: String!) {
    deleteLikeByUserRecipient(userId: $userId, recipientId: $recipientId)
  }
`;
export type DeleteLikeByUserRecipientMutationFn = ApolloReactCommon.MutationFunction<
  DeleteLikeByUserRecipientMutation,
  DeleteLikeByUserRecipientMutationVariables
>;

/**
 * __useDeleteLikeByUserRecipientMutation__
 *
 * To run a mutation, you first call `useDeleteLikeByUserRecipientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeByUserRecipientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeByUserRecipientMutation, { data, loading, error }] = useDeleteLikeByUserRecipientMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      recipientId: // value for 'recipientId'
 *   },
 * });
 */
export function useDeleteLikeByUserRecipientMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteLikeByUserRecipientMutation,
    DeleteLikeByUserRecipientMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteLikeByUserRecipientMutation,
    DeleteLikeByUserRecipientMutationVariables
  >(DeleteLikeByUserRecipientDocument, baseOptions);
}
export type DeleteLikeByUserRecipientMutationHookResult = ReturnType<
  typeof useDeleteLikeByUserRecipientMutation
>;
export type DeleteLikeByUserRecipientMutationResult = ApolloReactCommon.MutationResult<DeleteLikeByUserRecipientMutation>;
export type DeleteLikeByUserRecipientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteLikeByUserRecipientMutation,
  DeleteLikeByUserRecipientMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input)
  }
`;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CreatePostDocument, baseOptions);
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const CreatePostLikeDocument = gql`
  mutation CreatePostLike($input: PostLikeInput!) {
    createPostLike(input: $input)
  }
`;
export type CreatePostLikeMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostLikeMutation,
  CreatePostLikeMutationVariables
>;

/**
 * __useCreatePostLikeMutation__
 *
 * To run a mutation, you first call `useCreatePostLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostLikeMutation, { data, loading, error }] = useCreatePostLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostLikeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostLikeMutation,
    CreatePostLikeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreatePostLikeMutation,
    CreatePostLikeMutationVariables
  >(CreatePostLikeDocument, baseOptions);
}
export type CreatePostLikeMutationHookResult = ReturnType<
  typeof useCreatePostLikeMutation
>;
export type CreatePostLikeMutationResult = ApolloReactCommon.MutationResult<CreatePostLikeMutation>;
export type CreatePostLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostLikeMutation,
  CreatePostLikeMutationVariables
>;
export const MarkPostInactiveDocument = gql`
  mutation MarkPostInactive($id: ID!) {
    markPostInactive(postId: $id)
  }
`;
export type MarkPostInactiveMutationFn = ApolloReactCommon.MutationFunction<
  MarkPostInactiveMutation,
  MarkPostInactiveMutationVariables
>;

/**
 * __useMarkPostInactiveMutation__
 *
 * To run a mutation, you first call `useMarkPostInactiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPostInactiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPostInactiveMutation, { data, loading, error }] = useMarkPostInactiveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPostInactiveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MarkPostInactiveMutation,
    MarkPostInactiveMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    MarkPostInactiveMutation,
    MarkPostInactiveMutationVariables
  >(MarkPostInactiveDocument, baseOptions);
}
export type MarkPostInactiveMutationHookResult = ReturnType<
  typeof useMarkPostInactiveMutation
>;
export type MarkPostInactiveMutationResult = ApolloReactCommon.MutationResult<MarkPostInactiveMutation>;
export type MarkPostInactiveMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MarkPostInactiveMutation,
  MarkPostInactiveMutationVariables
>;
export const MarkPostCommentInactiveDocument = gql`
  mutation MarkPostCommentInactive($id: ID!) {
    markPostCommentInactive(postId: $id)
  }
`;
export type MarkPostCommentInactiveMutationFn = ApolloReactCommon.MutationFunction<
  MarkPostCommentInactiveMutation,
  MarkPostCommentInactiveMutationVariables
>;

/**
 * __useMarkPostCommentInactiveMutation__
 *
 * To run a mutation, you first call `useMarkPostCommentInactiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPostCommentInactiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPostCommentInactiveMutation, { data, loading, error }] = useMarkPostCommentInactiveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPostCommentInactiveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MarkPostCommentInactiveMutation,
    MarkPostCommentInactiveMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    MarkPostCommentInactiveMutation,
    MarkPostCommentInactiveMutationVariables
  >(MarkPostCommentInactiveDocument, baseOptions);
}
export type MarkPostCommentInactiveMutationHookResult = ReturnType<
  typeof useMarkPostCommentInactiveMutation
>;
export type MarkPostCommentInactiveMutationResult = ApolloReactCommon.MutationResult<MarkPostCommentInactiveMutation>;
export type MarkPostCommentInactiveMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MarkPostCommentInactiveMutation,
  MarkPostCommentInactiveMutationVariables
>;
export const MarkPostCommentReplyInactiveDocument = gql`
  mutation MarkPostCommentReplyInactive($id: ID!) {
    markPostCommentRepliesInactive(postId: $id)
  }
`;
export type MarkPostCommentReplyInactiveMutationFn = ApolloReactCommon.MutationFunction<
  MarkPostCommentReplyInactiveMutation,
  MarkPostCommentReplyInactiveMutationVariables
>;

/**
 * __useMarkPostCommentReplyInactiveMutation__
 *
 * To run a mutation, you first call `useMarkPostCommentReplyInactiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPostCommentReplyInactiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPostCommentReplyInactiveMutation, { data, loading, error }] = useMarkPostCommentReplyInactiveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkPostCommentReplyInactiveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MarkPostCommentReplyInactiveMutation,
    MarkPostCommentReplyInactiveMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    MarkPostCommentReplyInactiveMutation,
    MarkPostCommentReplyInactiveMutationVariables
  >(MarkPostCommentReplyInactiveDocument, baseOptions);
}
export type MarkPostCommentReplyInactiveMutationHookResult = ReturnType<
  typeof useMarkPostCommentReplyInactiveMutation
>;
export type MarkPostCommentReplyInactiveMutationResult = ApolloReactCommon.MutationResult<MarkPostCommentReplyInactiveMutation>;
export type MarkPostCommentReplyInactiveMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MarkPostCommentReplyInactiveMutation,
  MarkPostCommentReplyInactiveMutationVariables
>;
export const CreatePostCommentDocument = gql`
  mutation CreatePostComment($input: PostCommentInput!) {
    createPostComment(input: $input)
  }
`;
export type CreatePostCommentMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostCommentMutation,
  CreatePostCommentMutationVariables
>;

/**
 * __useCreatePostCommentMutation__
 *
 * To run a mutation, you first call `useCreatePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCommentMutation, { data, loading, error }] = useCreatePostCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostCommentMutation,
    CreatePostCommentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreatePostCommentMutation,
    CreatePostCommentMutationVariables
  >(CreatePostCommentDocument, baseOptions);
}
export type CreatePostCommentMutationHookResult = ReturnType<
  typeof useCreatePostCommentMutation
>;
export type CreatePostCommentMutationResult = ApolloReactCommon.MutationResult<CreatePostCommentMutation>;
export type CreatePostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostCommentMutation,
  CreatePostCommentMutationVariables
>;
export const CreatePostCommentReplyDocument = gql`
  mutation CreatePostCommentReply($input: PostCommentRepliesInput!) {
    createPostCommentReply(input: $input)
  }
`;
export type CreatePostCommentReplyMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostCommentReplyMutation,
  CreatePostCommentReplyMutationVariables
>;

/**
 * __useCreatePostCommentReplyMutation__
 *
 * To run a mutation, you first call `useCreatePostCommentReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCommentReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCommentReplyMutation, { data, loading, error }] = useCreatePostCommentReplyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostCommentReplyMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostCommentReplyMutation,
    CreatePostCommentReplyMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreatePostCommentReplyMutation,
    CreatePostCommentReplyMutationVariables
  >(CreatePostCommentReplyDocument, baseOptions);
}
export type CreatePostCommentReplyMutationHookResult = ReturnType<
  typeof useCreatePostCommentReplyMutation
>;
export type CreatePostCommentReplyMutationResult = ApolloReactCommon.MutationResult<CreatePostCommentReplyMutation>;
export type CreatePostCommentReplyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostCommentReplyMutation,
  CreatePostCommentReplyMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($input: InputUser!) {
    createUser(input: $input) {
      id
      about
      firstname
      lastname
      email
      age
      gender
      location
      latitude
      longitude
      lookingfor
      preference
      profilepic
      gallery1
      gallery2
      gallery3
      gallery4
      interest
      spirituality
      createdAt
      updatedAt
    }
  }
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: InputUser!, $id: ID!) {
    updateUser(input: $input, id: $id) {
      id
      about
      firstname
      lastname
      email
      age
      gender
      location
      latitude
      longitude
      lookingfor
      preference
      profilepic
      gallery1
      gallery2
      gallery3
      gallery4
      interest
      spirituality
      createdAt
      updatedAt
    }
  }
`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DeleteUserDocument, baseOptions);
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const UpdateUserTimeStampDocument = gql`
  mutation UpdateUserTimeStamp($id: ID!) {
    updateTimestamp(id: $id)
  }
`;
export type UpdateUserTimeStampMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserTimeStampMutation,
  UpdateUserTimeStampMutationVariables
>;

/**
 * __useUpdateUserTimeStampMutation__
 *
 * To run a mutation, you first call `useUpdateUserTimeStampMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserTimeStampMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserTimeStampMutation, { data, loading, error }] = useUpdateUserTimeStampMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserTimeStampMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserTimeStampMutation,
    UpdateUserTimeStampMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserTimeStampMutation,
    UpdateUserTimeStampMutationVariables
  >(UpdateUserTimeStampDocument, baseOptions);
}
export type UpdateUserTimeStampMutationHookResult = ReturnType<
  typeof useUpdateUserTimeStampMutation
>;
export type UpdateUserTimeStampMutationResult = ApolloReactCommon.MutationResult<UpdateUserTimeStampMutation>;
export type UpdateUserTimeStampMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserTimeStampMutation,
  UpdateUserTimeStampMutationVariables
>;
export const ListUsersByIdDocument = gql`
  query ListUsersByID($ids: [String!]!) {
    listUsersById(ids: $ids) {
      id
      firstname
      lastname
      profilepic
    }
  }
`;

/**
 * __useListUsersByIdQuery__
 *
 * To run a query within a React component, call `useListUsersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersByIdQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useListUsersByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ListUsersByIdQuery,
    ListUsersByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ListUsersByIdQuery,
    ListUsersByIdQueryVariables
  >(ListUsersByIdDocument, baseOptions);
}
export function useListUsersByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ListUsersByIdQuery,
    ListUsersByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ListUsersByIdQuery,
    ListUsersByIdQueryVariables
  >(ListUsersByIdDocument, baseOptions);
}
export type ListUsersByIdQueryHookResult = ReturnType<
  typeof useListUsersByIdQuery
>;
export type ListUsersByIdLazyQueryHookResult = ReturnType<
  typeof useListUsersByIdLazyQuery
>;
export type ListUsersByIdQueryResult = ApolloReactCommon.QueryResult<
  ListUsersByIdQuery,
  ListUsersByIdQueryVariables
>;
export const ILikeYouDocument = gql`
  query ILikeYou($userId: ID!, $recipientId: String!) {
    iLikeYou(recipientId: $recipientId, userId: $userId) {
      userId
      recipientId
      likeId
      isDivine
      firstname
      lastname
      location
      profilepic
      updatedAt
    }
  }
`;

/**
 * __useILikeYouQuery__
 *
 * To run a query within a React component, call `useILikeYouQuery` and pass it any options that fit your needs.
 * When your component renders, `useILikeYouQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useILikeYouQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      recipientId: // value for 'recipientId'
 *   },
 * });
 */
export function useILikeYouQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ILikeYouQuery,
    ILikeYouQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ILikeYouQuery, ILikeYouQueryVariables>(
    ILikeYouDocument,
    baseOptions,
  );
}
export function useILikeYouLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ILikeYouQuery,
    ILikeYouQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ILikeYouQuery, ILikeYouQueryVariables>(
    ILikeYouDocument,
    baseOptions,
  );
}
export type ILikeYouQueryHookResult = ReturnType<typeof useILikeYouQuery>;
export type ILikeYouLazyQueryHookResult = ReturnType<
  typeof useILikeYouLazyQuery
>;
export type ILikeYouQueryResult = ApolloReactCommon.QueryResult<
  ILikeYouQuery,
  ILikeYouQueryVariables
>;
export const FindPostDocument = gql`
  query FindPost($id: ID!) {
    findPost(id: $id) {
      id
      userId
      body
      active
      firstname
      lastname
      location
      profilepic
      media {
        uri
        mediaType
      }
      tags
      flair
      flairText
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useFindPostQuery__
 *
 * To run a query within a React component, call `useFindPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindPostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindPostQuery,
    FindPostQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<FindPostQuery, FindPostQueryVariables>(
    FindPostDocument,
    baseOptions,
  );
}
export function useFindPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindPostQuery,
    FindPostQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<FindPostQuery, FindPostQueryVariables>(
    FindPostDocument,
    baseOptions,
  );
}
export type FindPostQueryHookResult = ReturnType<typeof useFindPostQuery>;
export type FindPostLazyQueryHookResult = ReturnType<
  typeof useFindPostLazyQuery
>;
export type FindPostQueryResult = ApolloReactCommon.QueryResult<
  FindPostQuery,
  FindPostQueryVariables
>;
export const ListPostDocument = gql`
  query ListPost {
    findManyPost {
      id
      userId
      body
      active
      firstname
      lastname
      location
      profilepic
      media {
        uri
        mediaType
      }
      tags
      flair
      flairText
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useListPostQuery__
 *
 * To run a query within a React component, call `useListPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ListPostQuery,
    ListPostQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ListPostQuery, ListPostQueryVariables>(
    ListPostDocument,
    baseOptions,
  );
}
export function useListPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ListPostQuery,
    ListPostQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ListPostQuery, ListPostQueryVariables>(
    ListPostDocument,
    baseOptions,
  );
}
export type ListPostQueryHookResult = ReturnType<typeof useListPostQuery>;
export type ListPostLazyQueryHookResult = ReturnType<
  typeof useListPostLazyQuery
>;
export type ListPostQueryResult = ApolloReactCommon.QueryResult<
  ListPostQuery,
  ListPostQueryVariables
>;
export const FindCommentsWithPostDocument = gql`
  query FindCommentsWithPost($id: ID!) {
    findCommentsWithPostId(postId: $id) {
      id
      userId
      postId
      body
      active
      media {
        uri
        mediaType
      }
      tags
      flair
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useFindCommentsWithPostQuery__
 *
 * To run a query within a React component, call `useFindCommentsWithPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentsWithPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentsWithPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindCommentsWithPostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindCommentsWithPostQuery,
    FindCommentsWithPostQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    FindCommentsWithPostQuery,
    FindCommentsWithPostQueryVariables
  >(FindCommentsWithPostDocument, baseOptions);
}
export function useFindCommentsWithPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindCommentsWithPostQuery,
    FindCommentsWithPostQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    FindCommentsWithPostQuery,
    FindCommentsWithPostQueryVariables
  >(FindCommentsWithPostDocument, baseOptions);
}
export type FindCommentsWithPostQueryHookResult = ReturnType<
  typeof useFindCommentsWithPostQuery
>;
export type FindCommentsWithPostLazyQueryHookResult = ReturnType<
  typeof useFindCommentsWithPostLazyQuery
>;
export type FindCommentsWithPostQueryResult = ApolloReactCommon.QueryResult<
  FindCommentsWithPostQuery,
  FindCommentsWithPostQueryVariables
>;
export const FindRepliesWithCommentDocument = gql`
  query FindRepliesWithComment($id: ID!) {
    findRepliesWithCommentId(id: $id) {
      id
      userId
      postCommentId
      body
      active
      media {
        uri
        mediaType
      }
      tags
      flair
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useFindRepliesWithCommentQuery__
 *
 * To run a query within a React component, call `useFindRepliesWithCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRepliesWithCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRepliesWithCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindRepliesWithCommentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindRepliesWithCommentQuery,
    FindRepliesWithCommentQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    FindRepliesWithCommentQuery,
    FindRepliesWithCommentQueryVariables
  >(FindRepliesWithCommentDocument, baseOptions);
}
export function useFindRepliesWithCommentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindRepliesWithCommentQuery,
    FindRepliesWithCommentQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    FindRepliesWithCommentQuery,
    FindRepliesWithCommentQueryVariables
  >(FindRepliesWithCommentDocument, baseOptions);
}
export type FindRepliesWithCommentQueryHookResult = ReturnType<
  typeof useFindRepliesWithCommentQuery
>;
export type FindRepliesWithCommentLazyQueryHookResult = ReturnType<
  typeof useFindRepliesWithCommentLazyQuery
>;
export type FindRepliesWithCommentQueryResult = ApolloReactCommon.QueryResult<
  FindRepliesWithCommentQuery,
  FindRepliesWithCommentQueryVariables
>;
export const FindLikesByPostDocument = gql`
  query FindLikesByPost($id: ID!) {
    findLikesByPost(id: $id) {
      id
      userId
      postId
      createdAt
    }
  }
`;

/**
 * __useFindLikesByPostQuery__
 *
 * To run a query within a React component, call `useFindLikesByPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLikesByPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLikesByPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindLikesByPostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindLikesByPostQuery,
    FindLikesByPostQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    FindLikesByPostQuery,
    FindLikesByPostQueryVariables
  >(FindLikesByPostDocument, baseOptions);
}
export function useFindLikesByPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindLikesByPostQuery,
    FindLikesByPostQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    FindLikesByPostQuery,
    FindLikesByPostQueryVariables
  >(FindLikesByPostDocument, baseOptions);
}
export type FindLikesByPostQueryHookResult = ReturnType<
  typeof useFindLikesByPostQuery
>;
export type FindLikesByPostLazyQueryHookResult = ReturnType<
  typeof useFindLikesByPostLazyQuery
>;
export type FindLikesByPostQueryResult = ApolloReactCommon.QueryResult<
  FindLikesByPostQuery,
  FindLikesByPostQueryVariables
>;
export const FindLikesByUserDocument = gql`
  query FindLikesByUser($id: ID!) {
    findLikesByUser(id: $id) {
      id
      userId
      postId
      createdAt
    }
  }
`;

/**
 * __useFindLikesByUserQuery__
 *
 * To run a query within a React component, call `useFindLikesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLikesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLikesByUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindLikesByUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindLikesByUserQuery,
    FindLikesByUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    FindLikesByUserQuery,
    FindLikesByUserQueryVariables
  >(FindLikesByUserDocument, baseOptions);
}
export function useFindLikesByUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindLikesByUserQuery,
    FindLikesByUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    FindLikesByUserQuery,
    FindLikesByUserQueryVariables
  >(FindLikesByUserDocument, baseOptions);
}
export type FindLikesByUserQueryHookResult = ReturnType<
  typeof useFindLikesByUserQuery
>;
export type FindLikesByUserLazyQueryHookResult = ReturnType<
  typeof useFindLikesByUserLazyQuery
>;
export type FindLikesByUserQueryResult = ApolloReactCommon.QueryResult<
  FindLikesByUserQuery,
  FindLikesByUserQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      about
      firstname
      lastname
      email
      age
      gender
      location
      latitude
      longitude
      lookingfor
      preference
      profilepic
      gallery1
      gallery2
      gallery3
      gallery4
      interest
      spirituality
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const MyProfileDocument = gql`
  query MyProfile {
    myProfile {
      id
      about
      firstname
      lastname
      email
      age
      gender
      location
      latitude
      longitude
      lookingfor
      preference
      profilepic
      gallery1
      gallery2
      gallery3
      gallery4
      interest
      spirituality
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MyProfileQuery,
    MyProfileQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MyProfileQuery, MyProfileQueryVariables>(
    MyProfileDocument,
    baseOptions,
  );
}
export function useMyProfileLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MyProfileQuery,
    MyProfileQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(
    MyProfileDocument,
    baseOptions,
  );
}
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<
  typeof useMyProfileLazyQuery
>;
export type MyProfileQueryResult = ApolloReactCommon.QueryResult<
  MyProfileQuery,
  MyProfileQueryVariables
>;
export const ListUserDocument = gql`
  query ListUser($maxDistance: Float!) {
    listUsersDeckSwiper(maxDistance: $maxDistance) {
      id
      firstname
      lastname
      location
      profilepic
      distance
      updatedAt
    }
  }
`;

/**
 * __useListUserQuery__
 *
 * To run a query within a React component, call `useListUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUserQuery({
 *   variables: {
 *      maxDistance: // value for 'maxDistance'
 *   },
 * });
 */
export function useListUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ListUserQuery,
    ListUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ListUserQuery, ListUserQueryVariables>(
    ListUserDocument,
    baseOptions,
  );
}
export function useListUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ListUserQuery,
    ListUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ListUserQuery, ListUserQueryVariables>(
    ListUserDocument,
    baseOptions,
  );
}
export type ListUserQueryHookResult = ReturnType<typeof useListUserQuery>;
export type ListUserLazyQueryHookResult = ReturnType<
  typeof useListUserLazyQuery
>;
export type ListUserQueryResult = ApolloReactCommon.QueryResult<
  ListUserQuery,
  ListUserQueryVariables
>;
export const ListUserByNameDocument = gql`
  query ListUserByName($name: ID!) {
    listUsersByName(name: $name) {
      id
      firstname
      lastname
      profilepic
    }
  }
`;

/**
 * __useListUserByNameQuery__
 *
 * To run a query within a React component, call `useListUserByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUserByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUserByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useListUserByNameQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ListUserByNameQuery,
    ListUserByNameQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ListUserByNameQuery,
    ListUserByNameQueryVariables
  >(ListUserByNameDocument, baseOptions);
}
export function useListUserByNameLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ListUserByNameQuery,
    ListUserByNameQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ListUserByNameQuery,
    ListUserByNameQueryVariables
  >(ListUserByNameDocument, baseOptions);
}
export type ListUserByNameQueryHookResult = ReturnType<
  typeof useListUserByNameQuery
>;
export type ListUserByNameLazyQueryHookResult = ReturnType<
  typeof useListUserByNameLazyQuery
>;
export type ListUserByNameQueryResult = ApolloReactCommon.QueryResult<
  ListUserByNameQuery,
  ListUserByNameQueryVariables
>;
export const UserChangeDocument = gql`
  subscription UserChange($id: ID!) {
    userUpdated(mutationType: UPDATED, id: $id) {
      mutationType
      id
    }
  }
`;

/**
 * __useUserChangeSubscription__
 *
 * To run a query within a React component, call `useUserChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserChangeSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserChangeSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    UserChangeSubscription,
    UserChangeSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    UserChangeSubscription,
    UserChangeSubscriptionVariables
  >(UserChangeDocument, baseOptions);
}
export type UserChangeSubscriptionHookResult = ReturnType<
  typeof useUserChangeSubscription
>;
export type UserChangeSubscriptionResult = ApolloReactCommon.SubscriptionResult<UserChangeSubscription>;
