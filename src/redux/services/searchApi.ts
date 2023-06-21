import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPostsWithUser, IUsers, ITags } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getSearchPublications: build.query<IPostsWithUser, { text: string; page: number }>({
      query: ({ text, page }) => ({
        url: `/search?text=${text}&type=publications&page=${page || 0}`,
      }),
    }),
    getSearchUsers: build.query<IUsers, { text: string; page: number }>({
      query: ({ text, page }) => ({
        url: `/search?text=${text}&type=users&page=${page || 0}`,
      }),
    }),
    getSearchTags: build.query<ITags, { text: string; page: number }>({
      query: ({ text, page }) => ({
        url: `/search?text=${text}&type=tags&page=${page || 0}`,
      }),
    }),
    getPostsByTag: build.query<IPostsWithUser, { name: string; page: number }>({
      query: ({ name, page }) => ({
        url: `/posts/tag/${name}?page=${page || 0}`,
      }),
    }),
  }),
});

export const {
  useGetSearchPublicationsQuery,
  useGetSearchUsersQuery,
  useGetSearchTagsQuery,
  useGetPostsByTagQuery,
} = searchApi;
