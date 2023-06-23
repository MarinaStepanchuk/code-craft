import { ErrorMessages, Patch } from '@/constants/common.constants';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { amatic } from '@/app/layout';
import Link from 'next/link';
import Tag from '@/components/ExpandedPost/TagsList/Tag/Tag';
import { useGetTopicsQuery } from '@/redux/services/postsApi';
import { useAppSelector } from '@/hooks/redux';
import styles from './topic.module.scss';

const Topic = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const {
    data: result,
    isLoading,
    isError,
  } = useGetTopicsQuery({ count: 10, userId: user.id || '' });

  useEffect(() => {
    if (isError) {
      notifications.show({
        message: ErrorMessages.errorResponse,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [isError, result]);

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <p className={`${styles.title} ${amatic.className}`}>Recommended topics</p>
      {!!result?.length && (
        <div className={styles.listTags}>
          {result?.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      )}
      <Link href={`${Patch.searchPublications}?search=`} className={styles.linkMore}>
        See more
      </Link>
    </div>
  );
};

export default Topic;
