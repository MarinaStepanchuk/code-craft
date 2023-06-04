import { IPost } from '@/types/interfaces';
import PublicationCard from '../PublicationCard/PublicationCard';

const PublicationList = ({
  status,
  posts,
}: {
  status: 'published' | 'draft';
  posts: IPost[];
}): JSX.Element => (
  <div>
    {posts.map((post) => (
      <PublicationCard key={post.id} post={post} status={status} />
    ))}
  </div>
);

export default PublicationList;
