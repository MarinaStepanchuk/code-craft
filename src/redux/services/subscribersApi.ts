import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISubscriber } from '@/types/interfaces';

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
    getSubscribers: build.query<ISubscribersResponse, { author: string; offset: number }>({
      query: ({ author, offset }) => ({
        url: `/subscribers?author=${author}&offset=${offset}`,
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
  }),
});

export const {
  useGetSubscribersQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useCheckSubscribeQuery,
} = subscribersApi;
