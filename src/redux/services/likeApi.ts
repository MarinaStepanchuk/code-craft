import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.API_URL;

export const likeApi = createApi({
  reducerPath: 'likeApi',
  tagTypes: ['Like'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    checkLike: build.query<boolean, { userId: string; postId: number }>({
      query: ({ userId = '', postId }) => ({
        url: `/like?userId=${userId}&postId=${postId}`,
      }),
      providesTags: ['Like'],
    }),
    getLikes: build.query<number, number>({
      query: (postId) => ({
        url: `/likes?postId=${postId}`,
      }),
      providesTags: ['Like'],
    }),
    addLike: build.mutation<object, { userId: string; postId: number }>({
      query: ({ userId = '', postId }) => ({
        url: `/like?userId=${userId}&postId=${postId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Like'],
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
      invalidatesTags: ['Like'],
    }),
  }),
});

export const { useAddLikeMutation, useRemoveLikeMutation, useGetLikesQuery, useCheckLikeQuery } =
  likeApi;
