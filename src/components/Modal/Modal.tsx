import { Dispatch, SetStateAction } from 'react';
import styles from './modal.module.scss';

const Modal = ({
  active,
  setActive,
  children,
  cb,
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  cb?: () => void;
}): JSX.Element => {
  const closeModal = (): void => {
    if (cb) {
      cb();
    }
    setActive(false);
  };
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={closeModal}
    >
      <div
        className={active ? `${styles.content} ${styles.active}` : styles.content}
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
