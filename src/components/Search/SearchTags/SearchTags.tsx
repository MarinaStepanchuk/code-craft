'use client';

import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useGetSearchTagsQuery } from '@/redux/services/searchApi';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';
import { createRef, useEffect, useRef, useState } from 'react';
import Tag from '@/components/ExpandedPost/TagsList/Tag/Tag';
import { ITag } from '@/types/interfaces';
import styles from './searchTags.module.scss';

const SearchTags = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedTags, setDisplayedTags] = useState<ITag[]>([]);
  const lastItem = createRef<HTMLAnchorElement>();
  const observerLoader = useRef<IntersectionObserver | null>(null);
  const searchParams = useSearchParams();
  const text = searchParams.get('search');
  const { data, isLoading, isError } = useGetSearchTagsQuery({
    text: text || '',
    page: currentPage,
  });

  useEffect(() => {
    if (data) {
      setDisplayedTags([...displayedTags, ...data.tags]);
    }

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
  }, [isError, data]);

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    observerLoader.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        if (entries[0].isIntersecting && currentPage < (data?.amountPages as number)) {
          setCurrentPage(currentPage + 1);
        }
      }
    );
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
  }, [lastItem]);

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  return (
    <>
      <div className={styles.tagsContainer}>
        {displayedTags.map((tag, index) =>
          displayedTags.length === index + 1 ? (
            <Tag key={tag.id} tag={tag} size="big" ref={lastItem} />
          ) : (
            <Tag key={tag.id} tag={tag} size="big" />
          )
        )}
      </div>
      {!displayedTags.length && (
        <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>Nothing was found.</p>
      )}
    </>
  );
};

export default SearchTags;
