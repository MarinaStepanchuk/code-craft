'use client';

import { IconAlbum } from '@tabler/icons-react';

const Bookmark = (): JSX.Element => {
  const addBookmark = (): void => {};
  return (
    <IconAlbum size={30} strokeWidth="0.8" onClick={addBookmark} style={{ cursor: 'pointer' }} />
  );
};

export default Bookmark;
