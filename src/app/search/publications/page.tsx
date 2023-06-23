import SearchPublications from '@/components/Search/SearchPublications/SearchPublications';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';
import ProgressBarProvider from '@/providers/progressBar';

export const metadata: Metadata = { ...rootMetadata, title: 'Search posts' };

const PublicationsSearchPage = (): JSX.Element => (
  <ProgressBarProvider>
    <SearchPublications />
  </ProgressBarProvider>
);

export default PublicationsSearchPage;
