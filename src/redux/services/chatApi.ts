import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IChatAIMessage } from '@/types/interfaces';

const baseUrl = process.env.API_URL;

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    sendMessage: build.mutation<IChatAIMessage, string>({
      query: (message) => ({
        url: '/chat',
        method: 'POST',
        body: {
          message,
        },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
