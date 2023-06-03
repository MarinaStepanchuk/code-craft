import styles from './searchBar.module.scss';
import SearchButton from './SearchIcon';

const SearchBar = (): JSX.Element => (
  <div className={styles.searchBox}>
    <button className={styles.btnSearch}>
      <SearchButton />
    </button>
    <input className={styles.inputSearch} type="text" placeholder="Type to Search..." />
  </div>
);

export default SearchBar;
