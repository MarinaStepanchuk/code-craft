'use client';

import { useAppSelector } from '@/hooks/redux';
import { useUpdateBookmarksMutation } from '@/redux/services/userApi';
import { Tooltip, createStyles } from '@mantine/core';
import { IconAlbum } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { ErrorMessages } from '@/constants/common.constants';

const useStyles = createStyles((theme) => ({
  iconButton: {
    cursor: 'pointer',

    '&:hover': {
      stroke: theme.colors.brand[0],
      transform: 'scale(1.1)',
      strokeWidth: '1.4',
    },
  },
  isBookmarked: {
    stroke: theme.colors.brand[0],
  },
}));

const Bookmark = ({ postId }: { postId: number }): JSX.Element => {
  const { classes } = useStyles();
  const { user } = useAppSelector((state) => state.userReducer);
  const [updateBookmarks, resultUpdateBookmarks] = useUpdateBookmarksMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const checkBookmark = (): boolean => (user.bookmarks || '').split(' ').includes(String(postId));

  const addBookmark = (bookmarks: Array<string>): Array<string> => [...bookmarks, String(postId)];

  const removeBookmark = (bookmarks: Array<string>): Array<string> =>
    [...bookmarks].filter((element) => element !== String(postId));

  const handleBookmark = async (): Promise<void> => {
    const bookmarks = (user.bookmarks || '').split(' ');
    const newBookmarks = bookmarks.includes(String(postId))
      ? removeBookmark(bookmarks)
      : addBookmark(bookmarks);

    await updateBookmarks({ bookmarks: newBookmarks.join(' '), userId: user.id });

    setIsBookmarked(checkBookmark());
  };

  useEffect(() => {
    const { isError } = resultUpdateBookmarks;

    if (isError) {
      notifications.show({
        message: ErrorMessages.errorBookmarks,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [resultUpdateBookmarks]);

  useEffect(() => {
    setIsBookmarked(checkBookmark());
  }, [user]);

  return (
    <Tooltip label="Save" withArrow>
      <IconAlbum
        size={30}
        strokeWidth="0.8"
        onClick={handleBookmark}
        className={`${classes.iconButton} ${isBookmarked ? classes.isBookmarked : ''}`}
      />
    </Tooltip>
  );
};

export default Bookmark;
