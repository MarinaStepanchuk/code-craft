import { IconBookmarks } from '@tabler/icons-react';
import BookmarksList from '@/components/BookmarksList/BookmarksList';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next';
import ProgressBarProvider from '@/providers/progressBar';
import styles from './bookmarksPage.module.scss';

export const metadata: Metadata = { ...rootMetadata, title: 'My Bookmarks' };

const BookmarksPage = (): JSX.Element => (
  <>
    <ProgressBarProvider>
      <div className={styles.title}>
        <div className={styles.icon}>
          <IconBookmarks size="3rem" strokeWidth="1.2" />
        </div>
        <h2>Bookmarks</h2>
      </div>
      <section className={styles.searchResult}>
        <BookmarksList />
      </section>
    </ProgressBarProvider>
  </>
);

export default BookmarksPage;
