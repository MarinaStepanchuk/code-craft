import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPostsWithUser, ISubscriber } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

interface ISubscribersResponse {
  subscribers: ISubscriber[];
  page: number;
  amountPages: number;
  amountSubscribers: number;
}

export const subscribersApi = createApi({
  reducerPath: 'subscribersApi',
  tagTypes: ['Subscribers'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getSubscribers: build.query<ISubscribersResponse, { author: string; page: number }>({
      query: ({ author, page }) => ({
        url: `/subscribers?author=${author}&page=${page}`,
      }),
      providesTags: ['Subscribers'],
    }),
    subscribe: build.mutation<object, { author: string; subscriber: string }>({
      query: ({ author, subscriber }) => ({
        url: `/subscribers`,
        method: 'POST',
        body: {
          author,
          subscriber,
        },
      }),
      invalidatesTags: ['Subscribers'],
    }),
    unsubscribe: build.mutation<object, { author: string; subscriber: string }>({
      query: ({ author, subscriber }) => ({
        url: `/subscribers`,
        method: 'DELETE',
        body: {
          author,
          subscriber,
        },
      }),
      invalidatesTags: ['Subscribers'],
    }),
    checkSubscribe: build.query<boolean, { author: string; subscriber: string }>({
      query: ({ author, subscriber }) => ({
        url: `/subscribe?author=${author}&subscriber=${subscriber}`,
      }),
      providesTags: ['Subscribers'],
    }),
    getFeeds: build.query<IPostsWithUser, { userId: string; page: number }>({
      query: ({ userId, page }) => ({
        url: `/subscribers/feeds?userId=${userId}&page=${page}`,
      }),
      providesTags: ['Subscribers'],
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useCheckSubscribeQuery,
  useGetFeedsQuery,
} = subscribersApi;
