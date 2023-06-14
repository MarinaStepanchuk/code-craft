import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComment } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

interface ICreateCommentData {
  message: string;
  parentId: number | null;
  userId: string;
  postId: number;
}

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getAllComments: build.query<IComment[], number>({
      query: (postId) => ({
        url: `/comments?postId=${postId}`,
      }),
      providesTags: ['Comments'],
    }),
    createComment: build.mutation<IComment, ICreateCommentData>({
      query: (data) => ({
        url: '/comment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: build.mutation<IComment, { id: number; message: string }>({
      query: ({ id, message }) => ({
        url: `/comment/${id}`,
        method: 'PUT',
        body: {
          message,
        },
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: build.mutation<IComment, number>({
      query: (id) => ({
        url: `/comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
