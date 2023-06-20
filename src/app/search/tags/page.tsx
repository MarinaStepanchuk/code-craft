import SearchTags from '@/components/Search/SearchTags/SearchTags';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';

export const metadata: Metadata = { ...rootMetadata, title: 'Search tags' };

const TagsSearchPage = (): JSX.Element => <SearchTags />;

export default TagsSearchPage;
