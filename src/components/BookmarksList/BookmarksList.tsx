'use client';

import PostCard from '@/components/AllPosts/PostCard/PostCard';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useGetBookmarksPostsQuery } from '@/redux/services/userApi';
import { IPostWithUser } from '@/types/interfaces';
import { notifications } from '@mantine/notifications';
import { useState, useEffect, createRef, useRef } from 'react';
import ScrollUpButton from '../ScrollUpButton/ScrollUpButton';

const BookmarksList = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedBookmarks, setDisplayedBookmarks] = useState<IPostWithUser[]>([]);
  const { user } = useAppSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useGetBookmarksPostsQuery({
    userId: user.id,
    page: currentPage,
  });
  const lastItem = createRef<HTMLElement>();
  const observerLoader = useRef<IntersectionObserver | null>(null);
  const [activeUpButton, setActiveUpButton] = useState(false);

  useEffect(() => {
    setActiveUpButton(currentPage > 0);
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      setDisplayedBookmarks([...displayedBookmarks, ...data.posts]);
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

  if (!data?.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have any bookmarks.</p>;
  }

  return (
    <div>
      {displayedBookmarks.map((card, index) =>
        displayedBookmarks.length === index + 1 ? (
          <PostCard key={card.id} card={card} ref={lastItem} />
        ) : (
          <PostCard key={card.id} card={card} />
        )
      )}
      <ScrollUpButton active={activeUpButton} />
    </div>
  );
};

export default BookmarksList;
