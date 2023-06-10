import { IPostWithUser } from '@/types/interfaces';
import styles from './postsList.module.scss';
import PostCard from '../PostCard/PostCard';

const AllPostsList = ({
  cards,
  width = '60%',
}: {
  cards: IPostWithUser[];
  width?: string;
}): JSX.Element => (
  <section className={styles.postList} style={{ width: `${width}` }}>
    {cards.map((card, index) => (
      <PostCard key={index} card={card} />
    ))}
  </section>
);

export default AllPostsList;
