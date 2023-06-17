import { ISubscriber } from '@/types/interfaces';
import styles from './subscriber.module.scss';

const Subscriber = ({ subscriber }: { subscriber: ISubscriber }): JSX.Element => {
  const { id, email, name, bio, avatarUrl } = subscriber;
  return (
    <div className={styles.subscriber}>
      <p>{id}</p>
    </div>
  );
};

export default Subscriber;
