import { IPost } from '@/types/interfaces';
import PublicationCard from '../PublicationCard/PublicationCard';
import styles from './publications.module.scss';

const Publications = ({
  status,
  posts,
  isPublic,
}: {
  status: 'published' | 'draft';
  posts: IPost[];
  isPublic: boolean;
}): JSX.Element => (
  <div className={styles.publications}>
    {posts.map((post) => (
      <PublicationCard key={post.id} post={post} status={status} isPublic={isPublic} />
    ))}
  </div>
);

export default Publications;
