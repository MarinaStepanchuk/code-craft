import SearchNavigation from '@/components/Search/SearchNavigation/SearchNavigation';
import SearchNavigationHeader from '@/components/Search/SearchNavigationHeader/SearchNavigationHeader';
import styles from './searchLayout.module.scss';

export default function SearchLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <SearchNavigationHeader />
      <section className={styles.resultsSection}>
        <SearchNavigation />
        {children}
      </section>
    </>
  );
}
