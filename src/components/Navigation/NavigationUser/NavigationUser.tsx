'use client'

import { useAppSelector } from '@/huks/redux';
import { Menu, Text, Avatar, Flex, useMantineTheme, createStyles } from '@mantine/core';
import { IconUserEdit, IconWritingSign, IconLogout, IconHelp, IconBookmarks, IconChartDots3, IconArrowBadgeDown } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import styles from './navigationUser.module.scss'

const useStyles = createStyles((theme) => ({
  item: {
    color: theme.colors.brand[0]
  },
}))

const NavigationUser = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { email, avatarUrl } = user;
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { push } = useRouter();
  
  const redirectToProfile = ():void => {
    push('/profile');
  }

  return (
    <Menu shadow="md" width={400} position="bottom-end"  radius={10} >
      <Menu.Target>
        <Flex gap="3" justify="center" align="center" sx={{cursor: 'pointer'}}>
        { avatarUrl  ? 
          <Avatar src={avatarUrl} radius="xl" alt="user photo" sx={{borderRadius: '50%', width: '4.5rem', height: '4.5rem'}}></Avatar>
          : <div className={styles.userIcon}>{email[0]?.toUpperCase()}</div>
        }
        <IconArrowBadgeDown size={30} strokeWidth="1.2" />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown sx={{fontSize: '2rem', backgroundColor: theme.colors.brand[5], borderColor: '#ADB5BD', borderWidth: '1'}}>
        <Menu.Item icon={<IconUserEdit size={30} strokeWidth="1" />} sx={{fontSize: '1.5rem'}} onClick={redirectToProfile}>Profile</Menu.Item>
        <Menu.Item icon={<IconWritingSign size={30} strokeWidth="1" />} sx={{fontSize: '1.5rem'}}>Stories</Menu.Item>
        <Menu.Item icon={<IconBookmarks size={30} strokeWidth="1" />} sx={{fontSize: '1.5rem'}}>Bookmarks</Menu.Item>
        <Menu.Item icon={<IconChartDots3 size={30} strokeWidth="1" />} sx={{fontSize: '1.5rem'}}>Stats</Menu.Item>

        <Menu.Divider sx={{ borderTopColor: '#ADB5BD' }} />

        <Menu.Item icon={<IconHelp size={30} strokeWidth="1" />} sx={{fontSize: '1.5rem'}}>Help</Menu.Item>
        <Menu.Item className={classes.item} icon={<IconLogout size={30} strokeWidth="1"/>}  onClick={():Promise<undefined> => signOut()} sx={{fontSize: '1.5rem'}}>
        <Flex direction='column' justify="flex-start">
            <Text>LogOut</Text>
            <Text sx={{fontSize: '1rem'}}>{email}</Text>
          </Flex>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default NavigationUser;