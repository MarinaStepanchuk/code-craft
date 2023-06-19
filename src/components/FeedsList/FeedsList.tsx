'use client';

import { ErrorMessages } from '@/constants/common.constants';
import { useGetFeedsQuery } from '@/redux/services/subscribersApi';
import { notifications } from '@mantine/notifications';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/hooks/redux';
import PostCard from '../AllPosts/PostCard/PostCard';
import Preloader from '../Preloader/Preloader';

const FeedsList = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const { user } = useAppSelector((state) => state.userReducer);
  const { data: result, isLoading, isError } = useGetFeedsQuery({ userId: user.id, page });

  useEffect(() => {
    if (isError) {
      notifications.show({
        message: ErrorMessages.errorResponse,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [isError]);

  if (isLoading) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  if (isError) {
    return <></>;
  }

  if (!result?.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have subscriptions</p>;
  }

  return (
    <div>
      {result?.posts.map((post) => (
        <PostCard key={post.id} card={post} />
      ))}
    </div>
  );
};

export default FeedsList;
