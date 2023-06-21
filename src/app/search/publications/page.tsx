import SearchPublications from '@/components/Search/SearchPublications/SearchPublications';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';

export const metadata: Metadata = { ...rootMetadata, title: 'Search posts' };

const PublicationsSearchPage = (): JSX.Element => <SearchPublications />;

export default PublicationsSearchPage;
