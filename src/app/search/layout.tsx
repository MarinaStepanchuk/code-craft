'use client';

import SearchBar from '@/components/SearchBar/SearchBar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import styles from './searchLayout.module.scss';

export default function SearchLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPublicationsSearch = (): void => {
    push(`${Patch.searchPublications}?search=${searchParams.get('search')}`);
  };

  const goToUsersSearch = (): void => {
    push(`${Patch.searchUsers}?search=${searchParams.get('search')}`);
  };

  const goToTagsSearch = (): void => {
    push(`${Patch.searchTags}?search=${searchParams.get('search')}`);
  };

  return (
    <>
      <h2 className={styles.searchResultTitle}>
        {searchParams.get('search') ? (
          <>
            Results for: <span>{searchParams.get('search')}</span>
          </>
        ) : (
          'Enter your search term'
        )}
      </h2>
      {/* <section className={styles.searchSection}>
        <SearchBar />
      </section> */}
      <section className={styles.resultsSection}>
        <nav>
          <p
            onClick={goToPublicationsSearch}
            className={pathname.includes('/search/publications') ? styles.activeTab : ''}
          >
            Publications
          </p>
          <p
            onClick={goToUsersSearch}
            className={pathname.includes('/search/users') ? styles.activeTab : ''}
          >
            People
          </p>
          <p
            onClick={goToTagsSearch}
            className={pathname.includes('/search/tags') ? styles.activeTab : ''}
          >
            Topics
          </p>
        </nav>
        {children}
      </section>
    </>
  );
}
