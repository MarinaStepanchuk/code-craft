import { INotification } from '@/types/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.API_URL;

interface IAllNotificationsResponce {
  notifications: INotification[];
  page: number;
  amountPages: number;
  amountNotifications: number;
}

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  tagTypes: ['Notification'],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getNotifications: build.query<IAllNotificationsResponce, { userId: string; page: number }>({
      query: ({ userId, page }) => ({
        url: `/notification?userId=${userId}&page=${page}`,
      }),
      providesTags: ['Notification'],
    }),
    createNotification: build.mutation<object, { userId: string; message: string }>({
      query: ({ userId, message }) => ({
        url: '/notification',
        method: 'POST',
        body: {
          userId,
          message,
        },
      }),
      invalidatesTags: ['Notification'],
    }),
    removeNotification: build.mutation<object, number>({
      query: (id) => ({
        url: `/notification`,
        method: 'DELETE',
        body: {
          id,
        },
      }),
      invalidatesTags: ['Notification'],
    }),
    removeAllNotification: build.mutation<object, string>({
      query: (userId) => ({
        url: `/notification`,
        method: 'DELETE',
        body: {
          userId,
        },
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useRemoveNotificationMutation,
  useRemoveAllNotificationMutation,
} = notificationApi;
