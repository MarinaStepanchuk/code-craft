'use client'

import Image from 'next/image';
import searchIcon from '@/assets/icon-search.svg';
import { Select, TextInput } from '@mantine/core';
import styles from './searchBar.module.scss';


const SearchBar = ():JSX.Element => (
  <>
  <TextInput label="Shipping address" placeholder="15329 Huston 21st" />
  <div className={styles.searchBox}>
    <button className={styles.btnSearch}><Image width={30} height={30} src={searchIcon} alt='search-button'  /></button>
    <input className={styles.inputSearch} type='text' placeholder='Type to Search...' />
  </div>
  <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['React', 'Angular', 'Svelte', 'Vue']}
        placeholder="Pick one"
        label="Your favorite library/framework"
        
      />
  </>
)

export default SearchBar;