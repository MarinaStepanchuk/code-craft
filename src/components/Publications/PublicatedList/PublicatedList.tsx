import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useGetUserPostsQuery } from '@/redux/services/postsApi';
import { IPost } from '@/types/interfaces';
import { notifications } from '@mantine/notifications';
import { useState, useEffect } from 'react';
import PublicationList from '../PublicationsList/PublicationList';

const PublicatedList = ({ cb }: { cb: (count: number) => void }): JSX.Element => {
  const defaultValue = {
    posts: [],
    page: 1,
    amountPages: 1,
    amountPosts: 0,
  };
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useAppSelector((state) => state.userReducer);

  const {
    data: publications = defaultValue,
    isLoading: isLoadingPublished,
    isError: isErrorPublished,
  } = useGetUserPostsQuery({ userId: user.id, status: 'published', offset: currentPage });

  useEffect(() => {
    if (publications) {
      cb(publications.amountPosts);
    }
    if (isErrorPublished) {
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
  }, [publications, isErrorPublished]);

  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  if (isLoadingPublished) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  return (
    <PaginationContainer
      onPageClick={changePage}
      amountPages={publications.amountPages}
      page={publications.page}
    >
      <PublicationList status="draft" posts={publications.posts as IPost[]} />
    </PaginationContainer>
  );
};

export default PublicatedList;
