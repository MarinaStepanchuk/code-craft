import { ErrorMessages, Patch } from '@/constants/common.constants';
import { ITag } from '@/types/interfaces';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { amatic } from '@/app/layout';
import Link from 'next/link';
import Tag from '@/components/ExpandedPost/TagsList/Tag/Tag';
import { useGetTopicsQuery } from '@/redux/services/postsApi';
import { useAppSelector } from '@/hooks/redux';
import { useSession } from 'next-auth/react';
import styles from './topic.module.scss';

const Topic = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { status } = useSession();
  const {
    data: result,
    isLoading,
    isError,
  } = useGetTopicsQuery({ count: 10, userId: status === 'authenticated' ? user.id : null });
  const [renderList, setRenderList] = useState<ITag[]>();

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

    if (result) {
      setRenderList(result);
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
      {renderList && (
        <div className={styles.listTags}>
          {renderList.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      )}
      <Link href={`${Patch.me}${Patch.feeds}`} className={styles.linkMore}>
        See more
      </Link>
    </div>
  );
};

export default Topic;
