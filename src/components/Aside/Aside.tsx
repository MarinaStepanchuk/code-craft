'use client';

import { useSession } from 'next-auth/react';
import LastFeeds from './LastFeeds/LastFeeds';
import Topic from './Topic/Topic';
import styles from './aside.module.scss';

const Aside = (): JSX.Element => {
  const { status } = useSession();

  return (
    <aside className={styles.aside}>
      <div className={styles.stickyContainer}>
        {status === 'authenticated' && <LastFeeds />}
        <Topic />
      </div>
    </aside>
  );
};

export default Aside;
