import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPostsWithUser, IUser } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    registerUser: build.mutation<IUser, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/register',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    getUserById: build.query<IUser, string>({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: ['User'],
    }),
    getUserByEmail: build.query<IUser, string>({
      query: (email) => ({
        url: `/user/email/${email}`,
      }),
      providesTags: ['User'],
    }),
    updateUser: build.mutation<IUser, FormData>({
      query: (data) => ({
        url: '/user',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateBookmarks: build.mutation<IUser, { bookmarks: string; userId: string }>({
      query: ({ bookmarks, userId }) => ({
        url: `/bookmarks`,
        method: 'PUT',
        body: {
          bookmarks,
          userId,
        },
      }),
      invalidatesTags: ['User'],
    }),
    getBookmarksPosts: build.query<IPostsWithUser, { userId: string; page: number }>({
      query: ({ userId, page }) => ({
        url: `/bookmarks?userId=${userId || ''}&page=${page || 0}`,
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useUpdateBookmarksMutation,
  useGetBookmarksPostsQuery,
} = userApi;
