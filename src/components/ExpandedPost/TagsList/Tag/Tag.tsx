import { ITag } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import styles from './tag.module.scss';

const Tag = ({ tag, size }: { tag: ITag; key: number; size: 'small' | 'big' }): JSX.Element => {
  const { push } = useRouter();
  const handleTag = (): void => {
    push(`${Patch.tag}/${tag.name}`);
  };

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
