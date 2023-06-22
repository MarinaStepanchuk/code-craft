'use client';

import Link from 'next/link';
import { userSlice } from '@/redux/store/reducers/userSlice';
import { useGetUserByEmailQuery } from '@/redux/services/userApi';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { Flex } from '@mantine/core';
import { Session } from 'next-auth';
import { IconChevronDown, IconPencilPlus } from '@tabler/icons-react';
import { Patch } from '@/constants/common.constants';
import styles from './userMenu.module.scss';
import NavigationUser from '../NavigationUser/NavigationUser';

const UserMenu = ({ session }: { session: Session }): JSX.Element => {
  const { data, isLoading, isError } = useGetUserByEmailQuery(
    encodeURIComponent(session?.user?.email)
  );
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isError && data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch, isError, setUser]);

  return (
    <div className={styles.container}>
      <Link href={`${Patch.me}${Patch.newPost}`} className={styles.write}>
        <IconPencilPlus size={35} strokeWidth="1.2" className={styles.writeIcon} />
        <span className={styles.writeTitle}>Write</span>
      </Link>
      {!isLoading ? (
        <NavigationUser />
      ) : (
        <Flex gap="4px" justify="center" align="center">
          <div className={styles.userIcon}>U</div>
          <IconChevronDown size={20} strokeWidth="1.2" className={styles.arrowButton} />
        </Flex>
      )}
    </div>
  );
};

export default UserMenu;
