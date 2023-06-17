'use client';

import { useGetAllPostsQuery } from '@/redux/services/postsApi';
import styles from './postsList.module.scss';
import PostCard from '../PostCard/PostCard';

const AllPostsList = ({ width = '60%' }: { width?: string }): JSX.Element => {
  const { data } = useGetAllPostsQuery();
  return (
    <section className={styles.postList} style={{ width: `${width}` }}>
      {data?.posts.map((card) => (
        <PostCard key={card.id} card={card} />
      ))}
    </section>
  );
};

export default AllPostsList;
