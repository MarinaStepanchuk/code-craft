'use client';

import { Tabs, createStyles } from '@mantine/core';
import { IconUserEdit, IconBell } from '@tabler/icons-react';
import { useGetPostsQuery } from '@/redux/services/postsApi';
import { ErrorMessages } from '@/constants/common.constants';
import { useAppSelector } from '@/huks/redux';
import { IPost } from '@/types/interfaces';
import Preloader from '@/components/Preloader/Preloader';
import PublicationList from '../PublicationsList/PublicationList';

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
  const { user } = useAppSelector((state) => state.userReducer);
  const {
    data: publications,
    isLoading: isLoadingPublished,
    isError: isErrorPublished,
  } = useGetPostsQuery({ userId: user.id, status: 'published' });
  const {
    data: drafts,
    isLoading: isLoadingDrafts,
    isError: isErrorDrafts,
  } = useGetPostsQuery({ userId: user.id, status: 'draft' });

  if (isLoadingDrafts || isLoadingPublished) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  return (
    <Tabs defaultValue="Published" className={classes.container}>
      <Tabs.List className={classes.list}>
        <Tabs.Tab
          value="Drafts"
          icon={<IconUserEdit size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          <span>Drafts</span>
          <span>{drafts?.length || 0}</span>
        </Tabs.Tab>
        <Tabs.Tab
          value="Published"
          icon={<IconBell size="1.8rem" strokeWidth="1.2" />}
          className={classes.listItem}
        >
          <span>Published</span>
          <span>{publications?.length || 0}</span>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Drafts" pt="xs">
        {isErrorDrafts ? (
          <p>{ErrorMessages.errorPostLoading}</p>
        ) : (
          <PublicationList status="draft" posts={drafts as IPost[]} />
        )}
      </Tabs.Panel>

      <Tabs.Panel value="Published" pt="xs">
        {isErrorPublished ? (
          <p>{ErrorMessages.errorPostLoading}</p>
        ) : (
          <PublicationList status="published" posts={publications as IPost[]} />
        )}
      </Tabs.Panel>
    </Tabs>
  );
};

export default PublicationsNavigation;
