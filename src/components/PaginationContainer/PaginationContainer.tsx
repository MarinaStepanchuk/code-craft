import styles from './paginationContainer.module.scss';

interface IPaginationContainerProps {
  children: React.ReactNode;
  onPageClick: (page: number) => void;
  amountPages: number;
  page: number;
}

const PaginationContainer = ({
  children,
  amountPages,
  page: currentPage,
  onPageClick,
}: IPaginationContainerProps): JSX.Element => {
  const handleNextPageClick = (): void => {
    onPageClick(currentPage + 1);
  };

  const handlePrevPageClick = (): void => {
    onPageClick(currentPage - 1);
  };

  const handleEndPageClick = (): void => {
    console.log(amountPages);
    onPageClick(amountPages - 1);
  };

  const handleFirstPageClick = (): void => {
    onPageClick(0);
  };

  return (
    <div className={styles.paginationContainer}>
      {children}
      {children && (
        <div className={styles.paginator}>
          {amountPages > 0 && (
            <button
              className={styles.arrow}
              type="button"
              onClick={handleFirstPageClick}
              disabled={currentPage === 0}
            >
              {'<<'}
            </button>
          )}
          <button
            className={styles.arrow}
            type="button"
            onClick={handlePrevPageClick}
            disabled={currentPage === 0}
          >
            {'<'}
          </button>
          <span className={styles.navigation}>
            {currentPage + 1} / {amountPages}
          </span>
          <button
            className={styles.arrow}
            type="button"
            onClick={handleNextPageClick}
            disabled={currentPage + 1 === amountPages}
          >
            {'>'}
          </button>
          {amountPages > 0 && (
            <button
              className={styles.arrow}
              type="button"
              onClick={handleEndPageClick}
              disabled={currentPage + 1 === amountPages}
            >
              {'>>'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaginationContainer;
