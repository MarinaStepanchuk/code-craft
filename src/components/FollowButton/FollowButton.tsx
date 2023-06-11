'use client';

import styles from './followButton.module.scss';

const FollowButton = (): JSX.Element => {
  const handleFollowing = (): void => {};
  return (
    <p className={styles.followButton} onClick={handleFollowing}>
      + Follow
    </p>
  );
};

export default FollowButton;
