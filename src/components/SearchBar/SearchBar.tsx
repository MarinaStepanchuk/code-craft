import { useState } from 'react';
import styles from './searchBar.module.scss';
import SearchIcon from '../SearchButton/SearchIcon';

const SearchBar = (): JSX.Element => {
  const [text, setText] = useState('');
  const handleSearch = (): void => {
    console.log(1);
  };
  return (
    <div className={styles.searchBar}>
      <input type="text" value={text} onChange={(e): void => setText(e.target.value)} />
      <SearchIcon />
    </div>
  );
};

export default SearchBar;
