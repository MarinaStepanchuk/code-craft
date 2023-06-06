import { IPostWithUser } from '@/types/interfaces';
import styles from './postsList.module.scss';
import PostCard from '../PostCard/PostCard';

const AllPostsList = ({ cards }: { cards: IPostWithUser[] }): JSX.Element => (
  <section className={styles.postList}>
    {cards.map((card, index) => (
      <PostCard key={index} card={card} />
    ))}
  </section>
);

export default AllPostsList;
