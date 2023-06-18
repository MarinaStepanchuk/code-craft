'use client';

import { useSearchParams } from 'next/navigation';
import styles from './searchNavigationHeader.module.scss';

const SearchNavigationHeader = (): JSX.Element => {
  const searchParams = useSearchParams();

  return (
    <h2 className={styles.searchResultTitle}>
      {searchParams.get('search') ? (
        <>
          Results for: <span>{searchParams.get('search')}</span>
        </>
      ) : (
        'Enter your search term'
      )}
    </h2>
  );
};

export default SearchNavigationHeader;
