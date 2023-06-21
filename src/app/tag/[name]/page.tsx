import SearchByTag from '@/components/Search/SearchByTag/SearchByTag';
import { IconTags } from '@tabler/icons-react';
import { baseUrl, rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';
import styles from './tagPage.module.scss';

interface IPageProps {
  params: { name: string };
}

export const generateMetadata = ({ params: { name } }: IPageProps): Metadata => ({
  ...rootMetadata,
  title: name,
  openGraph: {
    url: `${baseUrl}tag/${name}`,
    images: [
      'https://firebasestorage.googleapis.com/v0/b/code-craft-app.appspot.com/o/images%2Flog.jpg?alt=media&token=7f6061b8-c5f1-4558-b968-3a622926077e',
    ],
    title: 'Code Craft',
    description: `Search results for articles by tag ${name}`,
  },
  twitter: {
    title: 'Code Craft',
    description: `Search results for articles by tag ${name}`,
    images: [
      'https://firebasestorage.googleapis.com/v0/b/code-craft-app.appspot.com/o/images%2Flog.jpg?alt=media&token=7f6061b8-c5f1-4558-b968-3a622926077e',
    ],
  },
});

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
