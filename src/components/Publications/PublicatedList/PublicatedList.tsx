import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorMessages } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useGetUserPostsQuery } from '@/redux/services/postsApi';
import { notifications } from '@mantine/notifications';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Publications from '../Publications/Publications';

const PublicatedList = ({
  setPublicationsCount,
}: {
  setPublicationsCount: Dispatch<SetStateAction<number>>;
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
    data: publications = defaultValue,
    isLoading: isLoadingPublished,
    isError: isErrorPublished,
  } = useGetUserPostsQuery({ userId: user.id, status: 'published', page: currentPage });

  useEffect(() => {
    if (publications) {
      setPublicationsCount(publications.amountPosts);
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

  // if (isErrorPublished) {
  //   return <></>;
  // }

  if (!publications.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have publication.</p>;
  }

  return (
    <PaginationContainer
      onPageClick={changePage}
      amountPages={publications.amountPages}
      page={publications.page}
    >
      <Publications status="draft" posts={publications.posts} isPublic={false} />
    </PaginationContainer>
  );
};

export default PublicatedList;
