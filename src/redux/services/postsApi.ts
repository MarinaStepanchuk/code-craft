import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '@/types/interfaces';

// const Headers = {
//   key: 'X-API-KEY',
// };

const baseUrl = process.env.API_URL;

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPosts: build.query<IPost[], string>({
      query: (text) => ({
        url: '',
        params: {
          name: text,
        },
        // headers: {
        //   [Headers.key]: ApiKey,
        // },
      }),
    }),
    getPostById: build.query<IPost, string>({
      query: (id) => ({
        url: `/${id}`,
        // headers: {
        //   [Headers.key]: ApiKey,
        // },
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;