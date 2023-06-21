'use client';

import { ErrorMessages } from '@/constants/common.constants';
import { useGetFeedsQuery } from '@/redux/services/subscribersApi';
import { notifications } from '@mantine/notifications';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { IPostWithUser } from '@/types/interfaces';
import PostCard from '../AllPosts/PostCard/PostCard';
import Preloader from '../Preloader/Preloader';
import ScrollUpButton from '../ScrollUpButton/ScrollUpButton';

const FeedsList = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedFeeds, setDisplayedFeeds] = useState<IPostWithUser[]>([]);
  const { user } = useAppSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useGetFeedsQuery({ userId: user.id, page: currentPage });
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
      setDisplayedFeeds([...displayedFeeds, ...data.posts]);
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

  if (isLoading) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  if (isError) {
    return <></>;
  }

  if (!data?.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have subscriptions</p>;
  }

  return (
    <div>
      {displayedFeeds.map((card, index) =>
        displayedFeeds.length === index + 1 ? (
          <PostCard key={card.id} card={card} ref={lastItem} />
        ) : (
          <PostCard key={card.id} card={card} />
        )
      )}
      <ScrollUpButton active={activeUpButton} />
    </div>
  );
};

export default FeedsList;
