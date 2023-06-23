import SearchTags from '@/components/Search/SearchTags/SearchTags';
import { rootMetadata } from '@/constants/common.constants';
import ProgressBarProvider from '@/providers/progressBar';
import { Metadata } from 'next/types';

export const metadata: Metadata = { ...rootMetadata, title: 'Search tags' };

const TagsSearchPage = (): JSX.Element => (
  <ProgressBarProvider>
    <SearchTags />
  </ProgressBarProvider>
);

export default TagsSearchPage;
