'use client';

import { useGetAllPostsQuery } from '@/redux/services/postsApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ErrorMessages } from '@/constants/common.constants';
import { notifications } from '@mantine/notifications';
import { IPostWithUser } from '@/types/interfaces';
import ScrollUpButton from '@/components/ScrollUpButton/ScrollUpButton';
import styles from './postsList.module.scss';
import PostCard from '../PostCard/PostCard';

const AllPostsList = ({ width = '60%' }: { width?: string }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError } = useGetAllPostsQuery({ page: currentPage, sort: 'DESC' });
  const [displayedPosts, setDisplayedPosts] = useState<IPostWithUser[]>([]);
  const [activeUpButton, setActiveUpButton] = useState(false);
  const observerLoader = useRef<IntersectionObserver | null>(null);
  const isLastPage = currentPage >= (data?.amountPages as number);

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

  return (
    <section className={styles.postList} style={{ width: `${width}` }}>
      {displayedPosts?.map((card, index) =>
        displayedPosts.length === index + 1 ? (
          <PostCard key={card.id} card={card} ref={lastItem} />
        ) : (
          <PostCard key={card.id} card={card} />
        )
      )}
      <ScrollUpButton active={activeUpButton} />
    </section>
  );
};

export default AllPostsList;
