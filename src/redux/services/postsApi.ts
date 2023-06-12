import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, IPostWithUser } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getUserPosts: build.query<IPost[], { userId: string; status: 'published' | 'draft' }>({
      query: ({ userId, status }) => ({
        url: `/posts?userId=${userId}&status=${status}`,
      }),
      providesTags: ['Posts'],
    }),
    // getPostById: build.query<IPost, string>({
    //   query: (id) => ({
    //     url: `/post/${id}`,
    //   }),
    //   providesTags: ['Posts'],
    // }),
    // getDraft: build.query<IPost, string>({
    //   query: (id) => ({
    //     url: `/post/draft/${id}`,
    //   }),
    //   providesTags: ['Posts'],
    // }),
    saveImageForPost: build.mutation<string | null, FormData>({
      query: (data) => ({
        url: '/save-image',
        method: 'POST',
        body: data,
      }),
    }),
    removeUnusedImages: build.mutation<Array<string> | null, Array<string>>({
      query: (data) => ({
        url: '/remove-images',
        method: 'POST',
        body: data,
      }),
    }),
    createPost: build.mutation<IPost, FormData>({
      query: (data) => ({
        url: '/post',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: build.mutation<IPost, FormData>({
      query: (data) => ({
        url: '/post',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation<IPost, number>({
      query: (id) => ({
        url: `/post/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    visitPost: build.mutation<object, number>({
      query: (id) => ({
        url: `/post/visit/${id}`,
        method: 'PUT',
      }),
    }),
    addLike: build.mutation<object, { userId: string; postId: number }>({
      query: ({ userId, postId }) => ({
        url: `/like?userId=${userId}&postId=${postId}`,
        method: 'POST',
      }),
    }),
    removeLike: build.mutation<object, { userId: string; postId: number }>({
      query: ({ userId, postId }) => ({
        url: `/like`,
        method: 'DELETE',
        body: {
          userId,
          postId,
        },
      }),
    }),
    getBookmarksPosts: build.query<IPostWithUser[], string>({
      query: (userId) => ({
        url: `/bookmarks?userId=${userId}`,
      }),
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  // useGetPostByIdQuery,
  // useGetDraftQuery,
  useSaveImageForPostMutation,
  useRemoveUnusedImagesMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useVisitPostMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
} = postsApi;
