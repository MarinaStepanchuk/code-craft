'use client';

import PostCard from '@/components/AllPosts/PostCard/PostCard';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useGetBookmarksPostsQuery } from '@/redux/services/userApi';
import { notifications } from '@mantine/notifications';
import { useState, useEffect } from 'react';

const BookmarksList = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const { user } = useAppSelector((state) => state.userReducer);
  const { data: result, isLoading, isError } = useGetBookmarksPostsQuery({ userId: user.id, page });

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

  if (!result?.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have any bookmarks.</p>;
  }

  return (
    <div>
      {result?.posts.map((post) => (
        <PostCard key={post.id} card={post} />
      ))}
    </div>
  );
};

export default BookmarksList;
