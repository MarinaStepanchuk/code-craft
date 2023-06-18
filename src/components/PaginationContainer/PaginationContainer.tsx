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
    onPageClick(amountPages);
  };

  const handleFirstPageClick = (): void => {
    onPageClick(0);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.children}>{children}</div>

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
            {currentPage + 1} / {amountPages + 1}
          </span>
          <button
            className={styles.arrow}
            type="button"
            onClick={handleNextPageClick}
            disabled={currentPage === amountPages}
          >
            {'>'}
          </button>
          {amountPages > 0 && (
            <button
              className={styles.arrow}
              type="button"
              onClick={handleEndPageClick}
              disabled={currentPage === amountPages}
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
