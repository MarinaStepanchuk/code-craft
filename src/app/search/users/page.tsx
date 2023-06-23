import SearchUsers from '@/components/Search/SearchUsers/SearchUsers';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';
import ProgressBarProvider from '@/providers/progressBar';

export const metadata: Metadata = { ...rootMetadata, title: 'Search users' };

const UsersSearchPage = (): JSX.Element => (
  <ProgressBarProvider>
    <SearchUsers />{' '}
  </ProgressBarProvider>
);

export default UsersSearchPage;
