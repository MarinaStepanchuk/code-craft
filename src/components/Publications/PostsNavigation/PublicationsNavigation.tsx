'use client';

import { Tabs, createStyles } from '@mantine/core';
import { IconUserEdit, IconBell, IconMessageCircle } from '@tabler/icons-react';
import ResponseComments from '@/components/Publications/ResponseComments/ResponseComments';
import { useState } from 'react';
import DraftsList from '../DraftsList/DraftsList';
import PublicatedList from '../PublicatedList/PublicatedList';

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
    display: 'flex',

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

    span: {
      display: 'flex',
      gap: '0.5rem',
    },
  },
}));

const PublicationsNavigation = (): JSX.Element => {
  const { classes } = useStyles();
  const [draftsCount, setDraftsCount] = useState(0);
  const [publicationsCount, setPublicationsCount] = useState(0);

  const getDraftsCount = (count: number): void => {
    setDraftsCount(count);
  };

  const getPublicationsCount = (count: number): void => {
    setPublicationsCount(count);
  };

  return (
    <Tabs defaultValue="Published" className={classes.container}>
      <Tabs.List className={classes.list}>
        <Tabs.Tab
          value="drafts"
          icon={<IconUserEdit size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          <span>Drafts</span>
          <span>{draftsCount}</span>
        </Tabs.Tab>
        <Tabs.Tab
          value="published"
          icon={<IconBell size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          <span>Published</span>
          <span>{publicationsCount}</span>
        </Tabs.Tab>
        <Tabs.Tab
          value="comments"
          icon={<IconMessageCircle size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          My Comments
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="drafts" pt="xs">
        <DraftsList cb={getDraftsCount} />
      </Tabs.Panel>

      <Tabs.Panel value="published" pt="xs">
        <PublicatedList cb={getPublicationsCount} />
      </Tabs.Panel>

      <Tabs.Panel value="comments" pt="xs">
        <ResponseComments />
      </Tabs.Panel>
    </Tabs>
  );
};

export default PublicationsNavigation;
