'use client';

import Link from 'next/link';
import { userSlice } from '@/redux/store/reducers/userSlice';
import { useGetUserByEmailQuery } from '@/redux/services/userApi';
import { useEffect } from 'react';
import { IUser } from '@/types/interfaces';
import { useAppDispatch } from '@/huks/redux';
import { Flex } from '@mantine/core';
import { Session } from 'next-auth';
import { IconArrowBadgeDown, IconPencilPlus } from '@tabler/icons-react';
import styles from './userMenu.module.scss';
import NavigationUser from '../NavigationUser/NavigationUser';

const UserMenu = ({ session }: { session: Session }): JSX.Element => {
  const { data, isLoading, isError } = useGetUserByEmailQuery(
    encodeURIComponent(session?.user?.email as string)
  );
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isError && data) {
      dispatch(setUser(data as IUser));
    }
  }, [data, dispatch, isError, setUser]);

  return (
    <div className={styles.container}>
      <Link href="/new-post" className={styles.write}>
        <IconPencilPlus size={35} strokeWidth="1.2" />
        Write
      </Link>
      {!isLoading ? (
        <NavigationUser />
      ) : (
        <Flex gap="3" justify="center" align="center">
          <div className={styles.userIcon}>U</div>
          <IconArrowBadgeDown size={30} strokeWidth="1.2" />
        </Flex>
      )}
    </div>
  );
};

export default UserMenu;
