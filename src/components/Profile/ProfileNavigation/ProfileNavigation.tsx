'use client';

import { Tabs, createStyles } from '@mantine/core';
import { IconUserEdit, IconBell, IconUsers } from '@tabler/icons-react';
import { useState } from 'react';
import NotificationList from '@/components/NotificationList/NotificationList';
import ProfileEditor from '../ProfileEditor/ProfileEditor';
import SubscribersList from '../Subscribes/SubscribersList/SubscribersList';

const useStyles = createStyles((theme) => ({
  container: {
    width: '80%',
    fontSize: '2rem',
  },
  list: {
    width: '100%',
    alignSelf: 'flex-start',
    marginBottom: '1rem',
    borderBottom: 'solid 1px rgb(190, 186, 186)',
    gap: '1rem',
  },
  listItem: {
    fontSize: '1.6rem',
    color: theme.colors.brand[2],

    '&:hover': {
      backgroundColor: 'inherit',
      borderBottom: 'solid 1px rgb(190, 186, 186)',
    },

    '&[data-active]': {
      color: theme.colors.brand[0],
      fontWeight: 600,

      svg: {
        strokeWidth: 1.8,
      },
    },
  },
}));

const ProfileNavigation = (): JSX.Element => {
  const { classes } = useStyles();
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <Tabs defaultValue="profile" className={classes.container}>
      <Tabs.List className={classes.list}>
        <Tabs.Tab
          value="profile"
          icon={<IconUserEdit size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          Profile
        </Tabs.Tab>
        <Tabs.Tab
          value="notifications"
          icon={<IconBell size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          <span>Notifications </span>
          <span>{`(${notificationCount})`}</span>
        </Tabs.Tab>

        <Tabs.Tab
          value="followers"
          icon={<IconUsers size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          <span>Followers </span>
          <span>{`(${subscribersCount})`}</span>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile" pt="xs">
        <ProfileEditor />
      </Tabs.Panel>

      <Tabs.Panel value="notifications" pt="xs">
        <NotificationList setNotificationCount={setNotificationCount} />
      </Tabs.Panel>

      <Tabs.Panel value="followers" pt="xs">
        <SubscribersList setSubscribersCount={setSubscribersCount} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileNavigation;
