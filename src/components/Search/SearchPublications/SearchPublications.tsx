'use client';

import PostCard from '@/components/AllPosts/PostCard/PostCard';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchPublicationsQuery } from '@/redux/services/searchApi';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchPublications = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const {
    data: result,
    isLoading,
    isError,
  } = useGetSearchPublicationsQuery({ text: text || '', page });

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

  if (isError) {
    return <></>;
  }

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

export default SearchPublications;
