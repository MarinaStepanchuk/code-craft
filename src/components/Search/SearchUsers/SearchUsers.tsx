'use client';

import Preloader from '@/components/Preloader/Preloader';
import UserCard from '@/components/UserCard/UserCard';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchUsersQuery } from '@/redux/services/searchApi';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { createRef, useEffect, useRef, useState } from 'react';
import { Divider } from '@mantine/core';
import { IUser } from '@/types/interfaces';
import styles from './searchUsers.module.scss';

const SearchUsers = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);
  const lastItem = createRef<HTMLElement>();
  const observerLoader = useRef<IntersectionObserver | null>(null);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const { data, isLoading, isError } = useGetSearchUsersQuery({
    text: text || '',
    page: currentPage,
  });

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
    </>
  );
};

export default SearchUsers;
