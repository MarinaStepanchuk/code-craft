import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPosts: build.query<IPost[], { userId: string; status: 'published' | 'draft' }>({
      query: ({ userId, status }) => ({
        url: `/posts?userId=${userId}&status=${status}`,
      }),
      providesTags: ['Posts'],
    }),
    getPostById: build.query<IPost, string>({
      query: (id) => ({
        url: `/post/${id}`,
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
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useSaveImageForPostMutation,
  useRemoveUnusedImagesMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postsApi;
