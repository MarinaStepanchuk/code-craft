import SearchByTag from '@/components/Search/SearchByTag/SearchByTag';
import { IconTags } from '@tabler/icons-react';
import styles from './tagPage.module.scss';

interface IPageProps {
  params: { name: string };
}

const TagPage = ({ params: { name } }: IPageProps): JSX.Element => (
  <>
    <div className={styles.title}>
      <div className={styles.icon}>
        <IconTags size="3rem" strokeWidth="1.2" />
      </div>
      <h2>{name.split('%20').join(' ')}</h2>
    </div>
    <section className={styles.searchResult}>
      <SearchByTag tag={name} />
    </section>
  </>
);

export default TagPage;
