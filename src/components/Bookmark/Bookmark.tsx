'use client';

import { Tooltip, createStyles } from '@mantine/core';
import { IconAlbum } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  iconButton: {
    cursor: 'pointer',

    '&:hover': {
      stroke: theme.colors.brand[0],
      transform: 'scale(1.1)',
      strokeWidth: '1.4',
    },
  },
}));

const Bookmark = (): JSX.Element => {
  const { classes } = useStyles();
  const addBookmark = (): void => {};
  return (
    <Tooltip label="Save" withArrow>
      <IconAlbum size={30} strokeWidth="0.8" onClick={addBookmark} className={classes.iconButton} />
    </Tooltip>
  );
};

export default Bookmark;