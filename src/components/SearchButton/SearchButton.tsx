'use client';

import { KeyboardEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import SearchIcon from './SearchIcon';
import styles from './searchButton.module.scss';

const SearchButton = (): JSX.Element => {
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get('search') || '');
  const { push } = useRouter();

  const handleSearch = (): void => {
    if (text.length > 1) {
      push(`${Patch.searchPublications}?search=${text}`);
    }
  };

  const handelEnterSearch = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && text.length > 1) {
      push(`${Patch.searchPublications}?search=${text}`);
    }
  };

  return (
    <div className={styles.searchBox}>
      <button className={styles.btnSearch}>
        <div onClick={handleSearch}>
          <SearchIcon />
        </div>
      </button>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="Type to Search..."
        value={text}
        onChange={(e): void => setText(e.target.value)}
        onSubmit={handleSearch}
        onKeyDown={(e): void => handelEnterSearch(e)}
      />
    </div>
  );
};

export default SearchButton;
