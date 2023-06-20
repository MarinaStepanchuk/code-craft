import { ITag } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import { forwardRef } from 'react';
import Link from 'next/link';
import styles from './tag.module.scss';

// eslint-disable-next-line react/display-name
const Tag = forwardRef<HTMLAnchorElement, { tag: ITag; size: 'small' | 'big' }>(
  ({ tag, size }, ref): JSX.Element => {
    const { push } = useRouter();
    const handleTag = (): void => {
      push(`${Patch.tag}/${tag.name}`);
    };

    return (
      <Link href={`${Patch.tag}/${tag.name}`} ref={ref}>
        <div
          className={`${styles.tag} ${size === 'small' ? styles.small : styles.big}`}
          onClick={handleTag}
        >
          {tag.name}
        </div>
      </Link>
    );
  }
);

export default Tag;
