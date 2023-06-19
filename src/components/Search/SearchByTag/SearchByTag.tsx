'use client';

import PostCard from '@/components/AllPosts/PostCard/PostCard';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetPostsByTagQuery } from '@/redux/services/searchApi';
import { notifications } from '@mantine/notifications';
import { useState, useEffect } from 'react';

const SearchByTag = ({ tag }: { tag: string }): JSX.Element => {
  const [page, setPage] = useState(0);
  const { data: result, isLoading, isError } = useGetPostsByTagQuery({ name: tag, page });

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
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>Nothing was found.</p>;
  }

  return (
    <div>
      {result?.posts.map((post) => (
        <PostCard key={post.id} card={post} />
      ))}
    </div>
  );
};

export default SearchByTag;
