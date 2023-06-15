import { useGetResponsesQuery } from '@/redux/services/commentsApi';
import Preloader from '@/components/Preloader/Preloader';
import { useAppSelector } from '@/hooks/redux';
import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import styles from './responseCommentList.module.scss';
import ResponseCommentItem from './ResponseCommentItem/ResponseCommentItem';
import { useEffect, useState } from 'react';

const ResponseCommentList = (): JSX.Element => {
  const defaultValue = {
    comments: [],
    page: 1,
    amountPages: 1,
  };
  const [currentPage, setCurrentPage] = useState(0);
  const { id: userId } = useAppSelector((state) => state.userReducer.user);
  const { data = defaultValue, isLoading: isLoadingComments } = useGetResponsesQuery({
    userId,
    offset: currentPage,
  });

  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <PaginationContainer onPageClick={changePage} amountPages={data.amountPages} page={data.page}>
      <div className={styles.comments}>
        {isLoadingComments && <Preloader width="5rem" height="5rem" color="#05386b" />}
        {data.comments.map((comment) => (
          <ResponseCommentItem comment={comment} key={comment.id} />
        ))}
      </div>
    </PaginationContainer>
  );
};

export default ResponseCommentList;
