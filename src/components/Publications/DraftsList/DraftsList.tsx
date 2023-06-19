import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import { useAppSelector } from '@/hooks/redux';
import { useGetUserPostsQuery } from '@/redux/services/postsApi';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import PublicationList from '../Publications/Publications';

const DraftsList = ({
  setDraftsCount,
}: {
  setDraftsCount: Dispatch<SetStateAction<number>>;
}): JSX.Element => {
  const defaultValue = {
    posts: [],
    page: 0,
    amountPages: 0,
    amountPosts: 0,
  };
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useAppSelector((state) => state.userReducer);

  const {
    data: drafts = defaultValue,
    isLoading: isLoadingDrafts,
    isError: isErrorDrafts,
  } = useGetUserPostsQuery({ userId: user.id, status: 'draft', page: currentPage });

  useEffect(() => {
    if (drafts) {
      setDraftsCount(drafts.amountPosts);
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

  if (!drafts.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have drafts.</p>;
  }

  return (
    <PaginationContainer
      onPageClick={changePage}
      amountPages={drafts.amountPages}
      page={drafts.page}
    >
      <PublicationList status="draft" posts={drafts.posts} isPublic={false} />
    </PaginationContainer>
  );
};

export default DraftsList;
