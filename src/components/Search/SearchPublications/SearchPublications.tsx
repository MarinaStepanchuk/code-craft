'use client';

import PostCard from '@/components/AllPosts/PostCard/PostCard';
import Preloader from '@/components/Preloader/Preloader';
import ScrollUpButton from '@/components/ScrollUpButton/ScrollUpButton';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchPublicationsQuery } from '@/redux/services/searchApi';
import { IPostWithUser } from '@/types/interfaces';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { createRef, useEffect, useRef, useState } from 'react';

const SearchPublications = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedPosts, setDisplayedPosts] = useState<IPostWithUser[]>([]);
  const lastItem = createRef<HTMLElement>();
  const observerLoader = useRef<IntersectionObserver | null>(null);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const { data, isLoading, isError } = useGetSearchPublicationsQuery({
    text: text || '',
    page: currentPage,
  });
  const [activeUpButton, setActiveUpButton] = useState(false);

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
