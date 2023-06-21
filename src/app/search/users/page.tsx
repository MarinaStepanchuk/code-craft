import SearchUsers from '@/components/Search/SearchUsers/SearchUsers';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';

export const metadata: Metadata = { ...rootMetadata, title: 'Search users' };

const UsersSearchPage = (): JSX.Element => <SearchUsers />;

export default UsersSearchPage;
