'use client';

import Preloader from '@/components/Preloader/Preloader';
import UserCard from '@/components/UserCard/UserCard';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchUsersQuery } from '@/redux/services/searchApi';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Divider } from '@mantine/core';
import styles from './searchUsers.module.scss';

const SearchUsers = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const { data: result, isLoading, isError } = useGetSearchUsersQuery({ text: text || '', page });

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

  if (isLoading) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  if (isError) {
    return <></>;
  }

  if (!result?.users.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>Nothing was found.</p>;
  }

  return (
    <div className={styles.usersContainer}>
      {result?.users.map((user) => (
        <>
          <UserCard key={user.id} user={user} />
          <Divider size={3} style={{ width: '100%' }} />
        </>
      ))}
    </div>
  );
};

export default SearchUsers;
