'use client';

import { useSession } from 'next-auth/react';
import LastFeeds from './LastFeeds/LastFeeds';
import Topic from './Topic/Topic';
import styles from './aside.module.scss';
import RecommendedPosts from './RecomendedPosts/Recomended';

const Aside = (): JSX.Element => {
  const { status } = useSession();

  return (
    <aside className={styles.aside}>
      {status === 'authenticated' && <LastFeeds />}
      <Topic />
      <RecommendedPosts />
    </aside>
  );
};

export default Aside;
