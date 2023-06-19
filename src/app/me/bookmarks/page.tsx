import { IconBookmarks } from '@tabler/icons-react';
import BookmarksList from '@/components/BookmarksList/BookmarksList';
import styles from './bookmarksPage.module.scss';

const BookmarksPage = (): JSX.Element => (
  <>
    <div className={styles.title}>
      <div className={styles.icon}>
        <IconBookmarks size="3rem" strokeWidth="1.2" />
      </div>
      <h2>Bookmarks</h2>
    </div>
    <section className={styles.searchResult}>
      <BookmarksList />
    </section>
  </>
);

export default BookmarksPage;
