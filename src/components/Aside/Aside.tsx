'use client';

import { useSession } from 'next-auth/react';

import styles from './aside.module.scss';
import LastFeeds from './LastFeeds/LastFeeds';

const Aside = (): JSX.Element => {
  const { status } = useSession();

  return (
    <aside className={styles.aside}>
      <div className={styles.stickyContainer}>{status === 'authenticated' && <LastFeeds />}</div>
    </aside>
  );
};

export default Aside;
