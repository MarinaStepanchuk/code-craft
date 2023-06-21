'use client';

import Preloader from '@/components/Preloader/Preloader';
import UserCard from '@/components/UserCard/UserCard';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchUsersQuery } from '@/redux/services/searchApi';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Divider } from '@mantine/core';
import { IUser } from '@/types/interfaces';
import ScrollUpButton from '@/components/ScrollUpButton/ScrollUpButton';
import styles from './searchUsers.module.scss';

const SearchUsers = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const { data, isLoading, isError } = useGetSearchUsersQuery({
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
          if (posts[0].isIntersecting && currentPage < !isLastPage) {
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
      setDisplayedUsers([...displayedUsers, ...data.users]);
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

  return (
    <>
      <div className={styles.usersContainer}>
        {displayedUsers.map((user, index) =>
          displayedUsers.length === index + 1 ? (
            <>
              <UserCard key={user.id} user={user} ref={lastItem} />
              <Divider size={3} style={{ width: '100%' }} />
            </>
          ) : (
            <>
              <UserCard key={user.id} user={user} />
              <Divider size={3} style={{ width: '100%' }} />
            </>
          )
        )}
      </div>
      {!displayedUsers.length && (
        <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>Nothing was found.</p>
      )}
      <ScrollUpButton active={activeUpButton} />
    </>
  );
};

export default SearchUsers;
