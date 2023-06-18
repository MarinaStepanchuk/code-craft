import styles from './searchButton.module.scss';
import SearchIcon from './SearchIcon';

const SearchButton = (): JSX.Element => (
  <div className={styles.searchBox}>
    <button className={styles.btnSearch}>
      <SearchIcon />
    </button>
    <input className={styles.inputSearch} type="text" placeholder="Type to Search..." />
  </div>
);

export default SearchButton;
