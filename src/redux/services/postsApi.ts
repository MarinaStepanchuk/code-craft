import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, IPostsWithUser, ITag } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

interface IGetPostsQueryParams {
  userId: string;
  status: 'published' | 'draft';
  page?: number;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getUserPosts: build.query<IPostsWithUser, IGetPostsQueryParams>({
      query: ({ userId, status, page }) => ({
        url: `/posts?userId=${userId || ''}&status=${status}&page=${page || ''}`,
      }),
      providesTags: ['Posts'],
    }),
    getAllPosts: build.query<IPostsWithUser, { page: number; sort: 'DESC' | 'ASC' }>({
      query: ({ page, sort }) => ({
        url: `/posts?page=${page || ''}&sort=${sort || ''}`,
      }),
      providesTags: ['Posts'],
    }),
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
    getTopics: build.query<ITag[], { count: number; userId: string | null }>({
      query: ({ count, userId }) => ({
        url: `/tags/topic?count=${count}&userId=${userId}`,
      }),
      providesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  useGetAllPostsQuery,
  useSaveImageForPostMutation,
  useRemoveUnusedImagesMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useVisitPostMutation,
  useGetTopicsQuery,
} = postsApi;
