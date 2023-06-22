'use client';

import { useAppSelector } from '@/hooks/redux';
import { Menu, Text, Avatar, Flex, useMantineTheme, createStyles } from '@mantine/core';
import {
  IconUserEdit,
  IconWritingSign,
  IconLogout,
  IconHelp,
  IconBookmarks,
  IconChevronDown,
  IconUsers,
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { Patch } from '@/constants/common.constants';
import Link from 'next/link';
import styles from './navigationUser.module.scss';

const useStyles = createStyles((theme) => ({
  item: {
    color: theme.colors.brand[0],
  },
}));

const NavigationUser = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { email, avatarUrl } = user;
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const logOut = async (): Promise<void> => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Menu shadow="md" width={400} position="bottom-end" radius={10}>
      <Menu.Target>
        <Flex gap="4px" justify="center" align="center" sx={{ cursor: 'pointer' }}>
          {avatarUrl ? (
            <Avatar
              src={avatarUrl}
              radius="xl"
              alt="user photo"
              sx={{ borderRadius: '50%', width: '4.5rem', height: '4.5rem' }}
            ></Avatar>
          ) : (
            <div className={styles.userIcon}>{email[0]?.toUpperCase()}</div>
          )}
          <IconChevronDown size={20} strokeWidth="1.2" />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown
        sx={{
          fontSize: '2rem',
          backgroundColor: theme.colors.brand[5],
          borderColor: '#ADB5BD',
          borderWidth: '1',
        }}
      >
        <Link href={`${Patch.me}${Patch.profile}`} className={styles.backButton}>
          <Menu.Item icon={<IconUserEdit size={30} strokeWidth="1" />} sx={{ fontSize: '1.5rem' }}>
            Profile
          </Menu.Item>
        </Link>
        <Link href={`${Patch.me}${Patch.publications}`} className={styles.backButton}>
          <Menu.Item
            icon={<IconWritingSign size={30} strokeWidth="1" />}
            sx={{ fontSize: '1.5rem' }}
          >
            Publications
          </Menu.Item>
        </Link>
        <Link href={`${Patch.me}${Patch.bookmarks}`} className={styles.backButton}>
          <Menu.Item icon={<IconBookmarks size={30} strokeWidth="1" />} sx={{ fontSize: '1.5rem' }}>
            Bookmarks
          </Menu.Item>
        </Link>
        <Link href={`${Patch.me}${Patch.feeds}`} className={styles.backButton}>
          <Menu.Item icon={<IconUsers size={30} strokeWidth="1" />} sx={{ fontSize: '1.5rem' }}>
            Feeds
          </Menu.Item>
        </Link>

        <Menu.Divider sx={{ borderTopColor: '#ADB5BD' }} />
        <Link href={`${Patch.contacts}`} className={styles.backButton}>
          <Menu.Item icon={<IconHelp size={30} strokeWidth="1" />} sx={{ fontSize: '1.5rem' }}>
            Сontact us
          </Menu.Item>
        </Link>

        <Menu.Item
          className={classes.item}
          icon={<IconLogout size={30} strokeWidth="1" />}
          onClick={logOut}
          sx={{ fontSize: '1.5rem' }}
        >
          <Flex direction="column" justify="flex-start">
            <Text>LogOut</Text>
            <Text sx={{ fontSize: '1rem' }}>{email}</Text>
          </Flex>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavigationUser;
