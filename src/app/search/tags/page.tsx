'use client';

import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchTagsQuery } from '@/redux/services/searchApi';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Tag from '@/components/ExpandedPost/TagsList/Tag/Tag';
import styles from './searchTags.module.scss';

const TagsSearchPage = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const { data: result, isLoading, isError } = useGetSearchTagsQuery({ text: text || '', page });

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
  }, [isError]);

  if (isLoading) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  if (!result?.tags.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>Nothing was found.</p>;
  }

  return (
    <div className={styles.tagsContainer}>
      {result?.tags.map((tag) => (
        <Tag key={tag.id} tag={tag} size="big" />
      ))}
    </div>
  );
};

export default TagsSearchPage;
