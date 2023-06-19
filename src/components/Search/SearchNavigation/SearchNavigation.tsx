'use client';

import { Patch } from '@/constants/common.constants';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './searchNavigation.module.scss';

const SearchNavigation = (): JSX.Element => {
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
    <nav className={styles.navigation}>
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
  );
};

export default SearchNavigation;
