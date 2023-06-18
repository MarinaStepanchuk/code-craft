import { ITag } from '@/types/interfaces';
import styles from './tag.module.scss';

const Tag = ({ tag, size }: { tag: ITag; key: number; size: 'small' | 'big' }): JSX.Element => {
  const handleTag = (): void => {};

  return (
    <div
      className={`${styles.tag} ${size === 'small' ? styles.small : styles.big}`}
      onClick={handleTag}
    >
      {tag.name}
    </div>
  );
};

export default Tag;
