import { useGetResponsesQuery } from '@/redux/services/commentsApi';
import Preloader from '@/components/Preloader/Preloader';
import { useAppSelector } from '@/hooks/redux';
import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import { useState } from 'react';
import styles from './responseComments.module.scss';
import ResponseCommentItem from './ResponseCommentItem/ResponseCommentItem';

const ResponseComments = (): JSX.Element => {
  const defaultValue = {
    comments: [],
    page: 0,
    amountPages: 0,
  };
  const [currentPage, setCurrentPage] = useState(0);
  const { id: userId } = useAppSelector((state) => state.userReducer.user);
  const { data = defaultValue, isLoading: isLoadingComments } = useGetResponsesQuery({
    userId,
    page: currentPage,
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

export default ResponseComments;
