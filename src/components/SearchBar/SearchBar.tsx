import Image from 'next/image';
import searchIcon from '@/assets/icon-search.svg';
import styles from './searchBar.module.scss';

const SearchBar = ():JSX.Element => (
  <div className={styles.searchBox}>
    <button className={styles.btnSearch}><Image width={30} height={30} src={searchIcon} alt='search-button'  /></button>
    <input className={styles.inputSearch} type='text' placeholder='Type to Search...' />
  </div>
)

export default SearchBar;