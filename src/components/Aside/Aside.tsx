'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import LastFeeds from './LastFeeds/LastFeeds';
import Topic from './Topic/Topic';
import styles from './aside.module.scss';
import RecommendedPosts from './RecomendedPosts/Recomended';

const Aside = (): JSX.Element => {
  const { status } = useSession();
  const [showTopic, setShowTopic] = useState(true);
  const [showLastFeeds, setShowLastFeeds] = useState(true);
  const [showRecommendedPosts, setShowRecommendedPosts] = useState(true);

  return (
    <aside className={styles.aside}>
      {status === 'authenticated' && showLastFeeds && (
        <LastFeeds setShowLastFeeds={setShowLastFeeds} />
      )}
      {showTopic && <Topic setShowTopic={setShowTopic} />}
      {showRecommendedPosts && (
        <RecommendedPosts setShowRecommendedPosts={setShowRecommendedPosts} />
      )}
    </aside>
  );
};

export default Aside;
