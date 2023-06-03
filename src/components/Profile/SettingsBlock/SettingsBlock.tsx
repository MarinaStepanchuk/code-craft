'use client';

import { Tabs, createStyles } from '@mantine/core';
import { IconUserEdit, IconBell, IconSettings } from '@tabler/icons-react';
import ProfileEditor from '../ProfileEditor/ProfileEditor';

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
  },
}));

const SettingsBlock = (): JSX.Element => {
  const { classes } = useStyles();

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
          Notifications
        </Tabs.Tab>
        <Tabs.Tab
          value="settings"
          icon={<IconSettings size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile" pt="xs">
        <ProfileEditor />
      </Tabs.Panel>

      <Tabs.Panel value="notifications" pt="xs">
        Messages
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
};

export default SettingsBlock;
