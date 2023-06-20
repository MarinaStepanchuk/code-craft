'use client';

import PostCard from '@/components/AllPosts/PostCard/PostCard';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetUserPostsQuery } from '@/redux/services/postsApi';
import { IPostWithUser } from '@/types/interfaces';
import { notifications } from '@mantine/notifications';
import { useState, createRef, useRef, useEffect } from 'react';

const AuthorPublications = ({ authorId }: { authorId: string }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedPosts, setDisplayedPosts] = useState<IPostWithUser[]>([]);
  const lastItem = createRef<HTMLElement>();
  const observerLoader = useRef<IntersectionObserver | null>(null);
  const { data, isLoading, isError } = useGetUserPostsQuery({
    userId: authorId,
    status: 'published',
  });

  useEffect(() => {
    if (data) {
      setDisplayedPosts([...displayedPosts, ...data.posts]);
    }

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
  }, [isError, data]);

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    observerLoader.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        if (entries[0].isIntersecting && currentPage < (data?.amountPages as number)) {
          setCurrentPage(currentPage + 1);
        }
      }
    );
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
  }, [lastItem]);

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  return (
    <section>
      {displayedPosts?.map((card, index) =>
        displayedPosts.length === index + 1 ? (
          <PostCard key={card.id} card={card} ref={lastItem} />
        ) : (
          <PostCard key={card.id} card={card} />
        )
      )}
    </section>
  );
};

export default AuthorPublications;
