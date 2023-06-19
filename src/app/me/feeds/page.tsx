import { IconUsers } from '@tabler/icons-react';
import FeedsList from '@/components/FeedsList/FeedsList';
import styles from './feedsPage.module.scss';

const FeedsPage = (): JSX.Element => (
  <>
    <div className={styles.title}>
      <div className={styles.icon}>
        <IconUsers size="3rem" strokeWidth="1.2" />
      </div>
      <h2>Feeds</h2>
    </div>
    <section className={styles.searchResult}>
      <FeedsList />
    </section>
  </>
);

export default FeedsPage;
