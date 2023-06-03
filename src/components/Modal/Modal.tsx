import { Dispatch, SetStateAction } from 'react';
import styles from './modal.module.scss';

const Modal = ({
  active,
  setActive,
  children,
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}): JSX.Element => (
  <div
    className={active ? `${styles.modal} ${styles.active}` : styles.modal}
    onClick={(): void => setActive(false)}
  >
    <div
      className={active ? `${styles.content} ${styles.active}` : styles.content}
      onClick={(e): void => e.stopPropagation()}
    >
      <div className={styles.closeModalButton} onClick={(): void => setActive(false)}>
        <span className={styles.closeLine}></span>
        <span className={styles.closeLine}></span>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
