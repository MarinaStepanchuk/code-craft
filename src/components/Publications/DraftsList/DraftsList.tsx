import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import { useAppSelector } from '@/hooks/redux';
import { useGetUserPostsQuery } from '@/redux/services/postsApi';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IPost } from '@/types/interfaces';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import PublicationList from '../PublicationsList/PublicationList';

const DraftsList = ({ cb }: { cb: (count: number) => void }): JSX.Element => {
  const defaultValue = {
    posts: [],
    page: 1,
    amountPages: 1,
  };
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useAppSelector((state) => state.userReducer);

  const {
    data: drafts = defaultValue,
    isLoading: isLoadingDrafts,
    isError: isErrorDrafts,
  } = useGetUserPostsQuery({ userId: user.id, status: 'draft', offset: currentPage });

  useEffect(() => {
    if (drafts) {
      cb(drafts.posts.length);
    }
    if (isErrorDrafts) {
      notifications.show({
        message: ErrorMessages.errorResponse,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [drafts, isErrorDrafts]);

  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  if (isLoadingDrafts) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  return (
    <PaginationContainer
      onPageClick={changePage}
      amountPages={drafts.amountPages}
      page={drafts.page}
    >
      <PublicationList status="draft" posts={drafts.posts as IPost[]} />
    </PaginationContainer>
  );
};

export default DraftsList;
