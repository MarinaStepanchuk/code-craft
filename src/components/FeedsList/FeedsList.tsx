'use client';

import { ErrorMessages } from '@/constants/common.constants';
import { useGetFeedsQuery } from '@/redux/services/subscribersApi';
import { notifications } from '@mantine/notifications';
import { useState, useEffect, createRef, useRef } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { IPostWithUser } from '@/types/interfaces';
import PostCard from '../AllPosts/PostCard/PostCard';
import Preloader from '../Preloader/Preloader';
import ScrollUpButton from '../ScrollUpButton/ScrollUpButton';

const FeedsList = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedFeeds, setDisplayedFeeds] = useState<IPostWithUser[]>([]);
  const lastItem = createRef<HTMLElement>();
  const observerLoader = useRef<IntersectionObserver | null>(null);
  const { user } = useAppSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useGetFeedsQuery({ userId: user.id, page: currentPage });
  const [activeUpButton, setActiveUpButton] = useState(false);

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
