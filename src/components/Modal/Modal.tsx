import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import styles from './modal.module.scss';

const Modal = ({
  isActive,
  setIsActive,
  children,
  cb,
  ref,
}: {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  cb?: () => void;
  ref: MutableRefObject<HTMLDivElement | null>;
}): JSX.Element => {
  const closeModal = (): void => {
    if (cb) {
      cb();
    }
    setIsActive(false);
  };
  return (
    <div
      className={isActive ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={closeModal}
      ref={ref}
    >
      <div
        className={isActive ? `${styles.content} ${styles.active}` : styles.content}
        onClick={(e): void => e.stopPropagation()}
      >
        <div className={styles.closeModalButton} onClick={closeModal}>
          <span className={styles.closeLine}></span>
          <span className={styles.closeLine}></span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
