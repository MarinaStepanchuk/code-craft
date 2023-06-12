'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import styles from './followButton.module.scss';

const FollowButton = (): JSX.Element => {
  const { status } = useSession();
  const { push } = useRouter();

  const handleFollowing = (): void => {
    if (status !== 'authenticated') {
      push(Patch.signIn);
    }
  };

  return (
    <button className={styles.followButton} onClick={handleFollowing}>
      + Follow
    </button>
  );
};

export default FollowButton;
