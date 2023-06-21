'use client';

import PostCard from '@/components/AllPosts/PostCard/PostCard';
import Preloader from '@/components/Preloader/Preloader';
import ScrollUpButton from '@/components/ScrollUpButton/ScrollUpButton';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchPublicationsQuery } from '@/redux/services/searchApi';
import { IPostWithUser } from '@/types/interfaces';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const SearchPublications = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedPosts, setDisplayedPosts] = useState<IPostWithUser[]>([]);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const { data, isLoading, isError } = useGetSearchPublicationsQuery({
    text: text || '',
    page: currentPage,
  });
  const [activeUpButton, setActiveUpButton] = useState(false);
  const isLastPage = currentPage >= (data?.amountPages as number);

  const observerLoader = useRef<IntersectionObserver | null>(null);
  const lastItem = useCallback(
    (post: HTMLElement) => {
      if (isLoading) return;

      if (observerLoader.current) {
        observerLoader.current.disconnect();
      }

      observerLoader.current = new IntersectionObserver(
        (posts: IntersectionObserverEntry[]): void => {
          if (posts[0].isIntersecting && !isLastPage) {
            setCurrentPage((prev) => prev + 1);
          }
        }
      );

      if (post) observerLoader.current.observe(post);
    },
    [isLoading, isLastPage]
  );

  useEffect(() => {
    setActiveUpButton(currentPage > 0);
  }, [currentPage]);

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

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  return (
    <div>
      {displayedPosts.map((card, index) =>
        displayedPosts.length === index + 1 ? (
          <PostCard key={card.id} card={card} ref={lastItem} />
        ) : (
          <PostCard key={card.id} card={card} />
        )
      )}
      {!displayedPosts.length && (
        <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>Nothing was found.</p>
      )}
      <ScrollUpButton active={activeUpButton} />
    </div>
  );
};

export default SearchPublications;
